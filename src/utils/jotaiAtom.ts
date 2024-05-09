import { atomWithStorage } from "jotai/utils";

const deviceAtom = atomWithStorage("device", {});
const foldersAtom = atomWithStorage("folders", []);
const notesAtom = atomWithStorage("notes", []);
const settings = atomWithStorage("settings", {});

export { foldersAtom, notesAtom, settings, deviceAtom };
