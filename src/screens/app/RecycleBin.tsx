import { useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useAtom } from "jotai";
import Screen from "../../components/ui/Screen";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import Button from "../../components/ui/Button";
import NavigationHeaderBar from "../../components/header/NavigationHeader";
import RecycledNoteCard from "../../components/card/RecycledNoteCard";
import ConfirmDeleteSheet from "../../components/bottomsheet/ConfirmDeleteSheet";
import NoData from "../../components/misc/NoData";
import TrashIcon from "../../assets/icons/TrashIcon";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import {
    emptyRecycleBin,
    permanentlyDeleteNote,
    restoreAllNotes,
    restoreNote,
} from "../../helpers/dbFunctions";
import { getRecycledNotes } from "../../utils/recycleBin";
import { toastNotification } from "../../utils/toast";
import { enterSection, fadeOut, layoutSpring } from "../../styles/motion";

type PendingDelete = { kind: "single"; note: any } | { kind: "all" } | null;

const showError = (message: string) =>
    toastNotification("error", "Something went wrong", message);

const RecycleBinScreen = () => {
    const [notes, setNotes] = useAtom<any[]>(notesAtom as any);
    const [folders] = useAtom<any[]>(foldersAtom as any);
    const [busy, setBusy] = useState(false);
    const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);
    const confirmSheetRef = useRef<any>();

    // Derived straight from the shared atom, so the list always reflects
    // what is persisted — no local copy to drift out of sync.
    const recycledNotes = useMemo(() => getRecycledNotes(notes), [notes]);
    const folderNames = useMemo(() => {
        const map: Record<string, string> = {};
        folders.forEach((folder: any) => (map[folder.folderID] = folder.name));
        return map;
    }, [folders]);

    const handleRestore = (note: any) => {
        setBusy(true);
        restoreNote(
            note.noteID,
            setNotes,
            () => {
                setBusy(false);
                toastNotification(
                    "success",
                    "Note restored",
                    `"${note.title || "Untitled"}" is back in your notes`
                );
            },
            () => {
                setBusy(false);
                showError("The note could not be restored");
            }
        );
    };

    const handleRestoreAll = () => {
        setBusy(true);
        const count = recycledNotes.length;
        restoreAllNotes(
            setNotes,
            () => {
                setBusy(false);
                toastNotification(
                    "success",
                    "Notes restored",
                    `${count} ${count === 1 ? "note" : "notes"} restored`
                );
            },
            () => {
                setBusy(false);
                showError("The notes could not be restored");
            }
        );
    };

    const askDelete = (pending: PendingDelete) => {
        setPendingDelete(pending);
        confirmSheetRef.current?.open();
    };

    const confirmDelete = () => {
        if (!pendingDelete) return;
        setBusy(true);
        const done = (title: string, text: string) => {
            setBusy(false);
            setPendingDelete(null);
            confirmSheetRef.current?.close();
            toastNotification("success", title, text);
        };
        const failed = () => {
            setBusy(false);
            showError("The note(s) could not be deleted");
        };

        if (pendingDelete.kind === "single") {
            permanentlyDeleteNote(
                pendingDelete.note.noteID,
                setNotes,
                () => done("Note deleted", "The note was permanently deleted"),
                failed
            );
        } else {
            emptyRecycleBin(
                setNotes,
                () =>
                    done(
                        "Recycle bin emptied",
                        "All notes were permanently deleted"
                    ),
                failed
            );
        }
    };

    const count = recycledNotes.length;
    const confirmQuestion =
        pendingDelete?.kind === "all"
            ? `All ${count} ${
                  count === 1 ? "note" : "notes"
              } in the Recycle bin will be permanently deleted. This can't be undone.`
            : `"${
                  pendingDelete?.kind === "single"
                      ? pendingDelete.note.title || "Untitled"
                      : ""
              }" will be permanently deleted. This can't be undone.`;

    return (
        <Screen>
            <NavigationHeaderBar
                title="Recycle Bin"
                subtitle={
                    count > 0
                        ? `${count} ${count === 1 ? "note" : "notes"}`
                        : undefined
                }
            />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Container className="pb-12 pt-4">
                    {count === 0 ? (
                        <NoData
                            icon={<TrashIcon size={{ width: "22", height: "22" }} />}
                            customHeaderText="Recycle bin is empty"
                            customCaptionText="Notes you delete will show up here, ready to restore"
                        />
                    ) : (
                        <>
                            <Animated.View
                                entering={enterSection(30)}
                                exiting={fadeOut}
                                layout={layoutSpring}
                                className="mb-4 flex-row items-center gap-3"
                            >
                                <Text className="flex-1 text-[13px] leading-[18px] text-ink-muted">
                                    Restore notes, or delete them for good.
                                </Text>
                                <View className="flex-row gap-2">
                                    <Button
                                        size="sm"
                                        label="Restore all"
                                        onPress={handleRestoreAll}
                                        disabled={busy}
                                    />
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        label="Empty bin"
                                        onPress={() => askDelete({ kind: "all" })}
                                        disabled={busy}
                                    />
                                </View>
                            </Animated.View>

                            {/* One column on phones, two on tablets. */}
                            <Grid
                                columns={1}
                                data={recycledNotes}
                                keyExtractor={(note) => note.noteID}
                                renderItem={(note) => (
                                    <RecycledNoteCard
                                        note={note}
                                        folderName={folderNames[note.folderID]}
                                        disabled={busy}
                                        onRestore={() => handleRestore(note)}
                                        onDeleteForever={() =>
                                            askDelete({ kind: "single", note })
                                        }
                                    />
                                )}
                            />
                        </>
                    )}
                </Container>
            </ScrollView>
            <ConfirmDeleteSheet
                deleteSheetRef={confirmSheetRef}
                processing={busy}
                actionToTake={confirmDelete}
                title="Delete forever?"
                question={confirmQuestion}
                confirmText="Delete forever"
            />
        </Screen>
    );
};

export default RecycleBinScreen;
