// Counts the live (not in Recycle bin) notes belonging to a folder.
const getFolderNoteCount = (folderID: string, notes: any[]) =>
    notes.filter((note) => note.folderID === folderID && !note.recycleBin)
        .length;

export { getFolderNoteCount };
