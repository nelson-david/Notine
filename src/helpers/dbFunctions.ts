import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Loads saved folders and notes, then calls `runOnFinish` once BOTH are in
// state (previously it fired before the data arrived, causing a flash of
// empty screens on launch).
const fetchAndSetInfo = async (
    setDevice: any,
    setFolders: any,
    setNotes: any,
    runOnFinish: any
) => {
    setDevice(Device);
    try {
        const [folders, notes] = await Promise.all([
            AsyncStorage.getItem("myFolders"),
            AsyncStorage.getItem("myNotes"),
        ]);
        setFolders(folders ? JSON.parse(folders) : []);
        setNotes(notes ? JSON.parse(notes) : []);
    } catch (e) {
        console.log("Failed to load saved data: ", e);
        setFolders([]);
        setNotes([]);
    } finally {
        runOnFinish();
    }
};

const createNewFolder = async (
    data: any,
    setFolders: any,
    onCompleteAction: any
) => {
    const myFolders = await AsyncStorage.getItem("myFolders");
    if (!myFolders) {
        const myFolders = [data];
        AsyncStorage.setItem("myFolders", JSON.stringify(myFolders)).then(
            async () => {
                const fetchedFolders = await AsyncStorage.getItem("myFolders");
                setFolders(JSON.parse(fetchedFolders));
                onCompleteAction();
            }
        );
    } else {
        const myDummyFolders: any = JSON.parse(myFolders);
        myDummyFolders.unshift(data);
        AsyncStorage.setItem("myFolders", JSON.stringify(myDummyFolders)).then(
            async () => {
                const fetchedFolders = await AsyncStorage.getItem("myFolders");
                setFolders(JSON.parse(fetchedFolders));
                onCompleteAction();
            }
        );
    }
};

const editFolder = async (
    data: any,
    setFolders: any,
    onCompleteAction: any
) => {
    const myFolders = await AsyncStorage.getItem("myFolders");
    let folderData = JSON.parse(myFolders).find(
        (folder: any) => folder.folderID === data.folderID
    );
    if (folderData) {
        const modifiedFolders = JSON.parse(myFolders).map((folder: any) => {
            if (folder.folderID === data.folderID) {
                return { ...folder, name: data.name, color: data.color };
            }
            return folder;
        });
        AsyncStorage.setItem("myFolders", JSON.stringify(modifiedFolders)).then(
            async () => {
                const fetchedFolders = await AsyncStorage.getItem("myFolders");
                setFolders(JSON.parse(fetchedFolders));
                onCompleteAction();
            }
        );
    }
};

const deleteFolder = async (
    folderID: string,
    setFolders: any,
    onCompleteAction: any
) => {
    const myFolders = await AsyncStorage.getItem("myFolders");
    let folderData = JSON.parse(myFolders).find(
        (folder: any) => folder.folderID === folderID
    );
    if (folderData) {
        const newFolders = JSON.parse(myFolders).filter(
            (folder: any) => folder.folderID !== folderID
        );
        AsyncStorage.setItem("myFolders", JSON.stringify(newFolders)).then(
            async () => {
                const fetchedFolders = await AsyncStorage.getItem("myFolders");
                setFolders(JSON.parse(fetchedFolders));
                onCompleteAction();
            }
        );
    }
};

const lockFolder = async (
    data: any,
    setFolders: any,
    onCompleteAction: any
) => {
    const myFolders = await AsyncStorage.getItem("myFolders");
    let folderData = JSON.parse(myFolders).find(
        (folder: any) => folder.folderID === data.folderID
    );
    if (folderData) {
        console.log("F-D-T: ", folderData);
        if (!folderData.locked) {
            const modifiedFolders = JSON.parse(myFolders).map((folder: any) => {
                if (folder.folderID === data.folderID) {
                    return { ...folder, locked: true, pin: data.pin };
                }
                return folder;
            });
            AsyncStorage.setItem(
                "myFolders",
                JSON.stringify(modifiedFolders)
            ).then(async () => {
                const fetchedFolders = await AsyncStorage.getItem("myFolders");
                setFolders(JSON.parse(fetchedFolders));
                onCompleteAction();
            });
        }
    }
};

const createNewNote = (data: any, setNotes: any, onCompleteAction: any) =>
    runMutation((notes) => [data, ...notes], setNotes, onCompleteAction);

/*
 * All note mutations go through `mutateNotes` so that:
 *  - AsyncStorage ("myNotes") stays the single source of truth,
 *  - the jotai atom is updated with exactly what was persisted,
 *  - read-modify-write cycles are serialized (rapid taps can't clobber
 *    each other's writes).
 */
let notesWriteQueue: Promise<any> = Promise.resolve();

const mutateNotes = (
    transform: (notes: any[]) => any[],
    setNotes: any
): Promise<any[]> => {
    const run = async () => {
        const stored = await AsyncStorage.getItem("myNotes");
        const current: any[] = stored ? JSON.parse(stored) : [];
        const next = transform(current);
        await AsyncStorage.setItem("myNotes", JSON.stringify(next));
        setNotes(next);
        return next;
    };
    const result = notesWriteQueue.then(run, run);
    notesWriteQueue = result.catch(() => {});
    return result;
};

const runMutation = (
    transform: (notes: any[]) => any[],
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    mutateNotes(transform, setNotes)
        .then(() => onCompleteAction && onCompleteAction())
        .catch((e) => {
            console.log("Notes storage error: ", e);
            onError && onError(e);
        });

// Merges only the fields provided in `data` into the matching note.
const updateNote = (data: any, setNotes: any, onCompleteAction: any) => {
    const { noteID, ...fields } = data;
    return runMutation(
        (notes) =>
            notes.map((note) =>
                note.noteID === noteID ? { ...note, ...fields } : note
            ),
        setNotes,
        onCompleteAction
    );
};

const moveNoteToRecycleBin = (
    noteID: string,
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    runMutation(
        (notes) =>
            notes.map((note) =>
                note.noteID === noteID
                    ? { ...note, recycleBin: true, deletedAt: Date.now() }
                    : note
            ),
        setNotes,
        onCompleteAction,
        onError
    );

const moveFolderNotesToRecycleBin = (
    folderID: string,
    setNotes: any,
    onCompleteAction?: any
) => {
    const deletedAt = Date.now();
    return runMutation(
        (notes) =>
            notes.map((note) =>
                note.folderID === folderID && !note.recycleBin
                    ? { ...note, recycleBin: true, deletedAt }
                    : note
            ),
        setNotes,
        onCompleteAction
    );
};

const restoreNote = (
    noteID: string,
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    runMutation(
        (notes) =>
            notes.map((note) => {
                if (note.noteID !== noteID) return note;
                const { deletedAt, ...rest } = note;
                return { ...rest, recycleBin: false };
            }),
        setNotes,
        onCompleteAction,
        onError
    );

const restoreAllNotes = (
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    runMutation(
        (notes) =>
            notes.map((note) => {
                if (!note.recycleBin) return note;
                const { deletedAt, ...rest } = note;
                return { ...rest, recycleBin: false };
            }),
        setNotes,
        onCompleteAction,
        onError
    );

const permanentlyDeleteNote = (
    noteID: string,
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    runMutation(
        (notes) => notes.filter((note) => note.noteID !== noteID),
        setNotes,
        onCompleteAction,
        onError
    );

const emptyRecycleBin = (
    setNotes: any,
    onCompleteAction?: any,
    onError?: any
) =>
    runMutation(
        (notes) => notes.filter((note) => !note.recycleBin),
        setNotes,
        onCompleteAction,
        onError
    );

export {
    fetchAndSetInfo,
    createNewFolder,
    deleteFolder,
    editFolder,
    lockFolder,
    createNewNote,
    updateNote,
    moveNoteToRecycleBin,
    moveFolderNotesToRecycleBin,
    restoreNote,
    restoreAllNotes,
    permanentlyDeleteNote,
    emptyRecycleBin,
};
