const getFolderNoteCount = (folderID: string, notes: any[]) => {
    const dummyNotes: any[] = [];
    notes.map((note) => {
        if (note.folderID === folderID) {
            dummyNotes.unshift(note);
        }
    });
    return dummyNotes.length;
};

export { getFolderNoteCount };
