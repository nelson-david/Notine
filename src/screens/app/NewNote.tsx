import { useState } from "react";
import { useAtom } from "jotai";
import NoteEditor from "../../components/note/NoteEditor";
import { generateRandomId } from "../../helpers/generateRandomId";
import { createNewNote } from "../../helpers/dbFunctions";
import { notesAtom } from "../../utils/jotaiAtom";
import { getContentPreview } from "../../utils/recycleBin";

const NewNoteScreen = ({ route }: { route: any }) => {
    const folder = route.params.folder;
    const [noteID] = useState(() => generateRandomId(8));
    const [, setNotes] = useAtom(notesAtom);

    const save = (title: string, content: string) => {
        // Don't litter the folder with empty notes if the user backs out.
        if (!title.trim() && !getContentPreview(content)) return;
        createNewNote(
            {
                noteID,
                folderID: folder.folderID,
                title: title.trim() || `Untitled ${noteID.slice(0, 2)}`,
                content,
                favourite: false,
                recycleBin: false,
                pinned: false,
                tag: "new content",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            setNotes,
            () => {}
        );
    };

    return <NoteEditor subtitle={folder.name} onSave={save} />;
};

export default NewNoteScreen;
