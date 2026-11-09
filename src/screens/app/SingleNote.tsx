import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import NoteEditor from "../../components/note/NoteEditor";
import NoteActionSheet from "../../components/bottomsheet/NoteActionSheet";
import IconButton from "../../components/ui/IconButton";
import EllipsisIcon from "../../assets/icons/EllipsisIcon";
import { updateNote } from "../../helpers/dbFunctions";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import { Nav } from "../../utils/types";

const SingleNoteScreen = ({ route }: { route: any }) => {
    const { id } = route.params;
    const { goBack } = useNavigation<Nav>();
    const [notes, setNotes] = useAtom<any[]>(notesAtom as any);
    const [folders] = useAtom<any[]>(foldersAtom as any);
    const actionSheetRef = useRef<any>();

    // Live note (for pin state etc.) and a snapshot for the editor's
    // initial content, taken once so typing isn't reset by re-renders.
    const note = notes.find((nt: any) => nt.noteID === id);
    const [initial] = useState(() => note);
    const folderName = folders.find(
        (f: any) => f.folderID === initial?.folderID
    )?.name;

    const save = (title: string, content: string) => {
        if (!initial) return;
        if (title === initial.title && content === initial.content) return;
        // Only persist the edited fields so pinned/favourite/recycleBin
        // state set elsewhere is never overwritten by the editor.
        updateNote(
            { noteID: id, title, content, updatedAt: Date.now() },
            setNotes,
            () => {}
        );
    };

    return (
        <>
            <NoteEditor
                initialTitle={initial?.title}
                initialContent={initial?.content}
                subtitle={folderName}
                onSave={save}
                headerRight={
                    note ? (
                        <IconButton
                            label="Note options"
                            onPress={() => actionSheetRef.current?.open()}
                        >
                            <EllipsisIcon size={{ width: "18", height: "18" }} />
                        </IconButton>
                    ) : null
                }
            />
            {note ? (
                <NoteActionSheet
                    note={note}
                    actionSheetRef={actionSheetRef}
                    inEditor
                    onAfterDelete={goBack}
                />
            ) : null}
        </>
    );
};

export default SingleNoteScreen;
