import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchAndSetInfo = (
    setDevice: any,
    setFolders: any,
    setNotes: any,
    runOnFinish: any
) => {
    setDevice(Device);

    AsyncStorage.getItem("myFolders").then((data) => {
        if (data) {
            setFolders(JSON.parse(data));
        } else {
            setFolders([]);
        }
    });

    AsyncStorage.getItem("myNotes").then((data) => {
        if (data) {
            setNotes(JSON.parse(data));
        } else {
            setNotes([]);
        }
    });

    runOnFinish();
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

const createNewNote = async (
    data: any,
    setNotes: any,
    onCompleteAction: any
) => {
    const myNotes = await AsyncStorage.getItem("myNotes");
    if (!myNotes) {
        const myNotes = [data];
        AsyncStorage.setItem("myNotes", JSON.stringify(myNotes)).then(
            async () => {
                const fetchedNotes = await AsyncStorage.getItem("myNotes");
                setNotes(JSON.parse(fetchedNotes));
                onCompleteAction();
            }
        );
    } else {
        const myDummyNotes: any = JSON.parse(myNotes);
        myDummyNotes.unshift(data);
        AsyncStorage.setItem("myNotes", JSON.stringify(myDummyNotes)).then(
            async () => {
                const fetchedNotes = await AsyncStorage.getItem("myNotes");
                setNotes(JSON.parse(fetchedNotes));
                onCompleteAction();
            }
        );
    }
};

const updateNote = async (data: any, setNotes: any, onCompleteAction: any) => {
    console.log("DNTT: ", data);
    const myNotes = await AsyncStorage.getItem("myNotes");
    let noteData = JSON.parse(myNotes).find(
        (note: any) => note.noteID === data.noteID
    );
    if (noteData) {
        const modifiedNotes = JSON.parse(myNotes).map((note: any) => {
            if (note.noteID === data.noteID) {
                return {
                    ...note,
                    content: data.content,
                    title: data.title,
                    pinned: data.pinned,
                    favourite: data.favourite,
                    recycleBin: data.recycleBin,
                };
            }
            return note;
        });
        AsyncStorage.setItem("myNotes", JSON.stringify(modifiedNotes)).then(
            async () => {
                const fetchedNotes = await AsyncStorage.getItem("myNotes");
                setNotes(JSON.parse(fetchedNotes));
                onCompleteAction();
            }
        );
    }
};

export {
    fetchAndSetInfo,
    createNewFolder,
    deleteFolder,
    editFolder,
    lockFolder,
    createNewNote,
    updateNote,
};
