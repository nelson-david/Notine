import { useRef, useState } from "react";
import { View } from "react-native";
import { useAtom } from "jotai";
import EllipsisIcon from "../../assets/icons/EllipsisIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import LockIcon from "../../assets/icons/LockIcon";
import EditIcon from "../../assets/icons/EditIcon";
import AppSheet from "../ui/AppSheet";
import ActionRow from "../ui/ActionRow";
import ScalePressable from "../ui/ScalePressable";
import ConfirmDeleteSheet from "../bottomsheet/ConfirmDeleteSheet";
import EditFolderSheet from "../bottomsheet/EditFolderSheet";
import LockFolderSheet from "../bottomsheet/LockFolderSheet";
import {
    deleteFolder,
    moveFolderNotesToRecycleBin,
} from "../../helpers/dbFunctions";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import { toastNotification } from "../../utils/toast";
import { useTheme } from "../../theme/useTheme";

const iconSize = { width: "20", height: "20" };

const FolderCardMenu = ({ folder }: { folder: any }) => {
    const { colors } = useTheme();
    const [, setFolders] = useAtom(foldersAtom);
    const [, setNotes] = useAtom(notesAtom);
    const menuSheetRef = useRef<any>();
    const deleteSheetRef = useRef<any>();
    const editSheetRef = useRef<any>();
    const lockSheetRef = useRef<any>();
    const [deletingFolder, setDeletingFolder] = useState(false);

    // Close the menu, then open the next sheet once it has slid away.
    const openFromMenu = (ref: any) => {
        menuSheetRef.current?.close();
        setTimeout(() => ref.current?.open(), 250);
    };

    const deleteAction = () => {
        setDeletingFolder(true);
        // Move the folder's notes to the Recycle bin first so they can be
        // restored, then remove the folder itself.
        moveFolderNotesToRecycleBin(folder.folderID, setNotes, () => {
            deleteFolder(folder.folderID, setFolders, () => {
                setDeletingFolder(false);
                deleteSheetRef.current?.close();
                toastNotification(
                    "success",
                    "Folder deleted",
                    "Its notes were moved to the Recycle bin"
                );
            });
        });
    };

    return (
        <>
            <ScalePressable
                haptic
                pressScale={0.88}
                onPress={() => menuSheetRef.current?.open()}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={`Options for ${folder.name}`}
                className="h-8 w-8 items-center justify-center rounded-full bg-surface-2"
            >
                <EllipsisIcon
                    size={{ width: "16", height: "16" }}
                    color={colors.inkMuted}
                />
            </ScalePressable>

            <AppSheet ref={menuSheetRef} title={folder.name}>
                <View className="gap-2">
                    <ActionRow
                        icon={<EditIcon size={iconSize} color={colors.ink} />}
                        label="Edit folder"
                        onPress={() => openFromMenu(editSheetRef)}
                    />
                    {!folder.locked ? (
                        <ActionRow
                            icon={<LockIcon size={iconSize} color={colors.ink} />}
                            label="Lock with PIN"
                            onPress={() => openFromMenu(lockSheetRef)}
                        />
                    ) : null}
                    <ActionRow
                        danger
                        icon={<TrashIcon size={iconSize} color={colors.accent} />}
                        label="Delete folder"
                        onPress={() => openFromMenu(deleteSheetRef)}
                    />
                </View>
            </AppSheet>

            <EditFolderSheet editSheetRef={editSheetRef} folder={folder} />
            <LockFolderSheet lockSheetRef={lockSheetRef} folder={folder} />
            <ConfirmDeleteSheet
                deleteSheetRef={deleteSheetRef}
                actionToTake={deleteAction}
                processing={deletingFolder}
                title="Delete folder?"
                question={`"${folder.name}" will be removed and its notes moved to the Recycle bin.`}
                confirmText="Delete"
            />
        </>
    );
};

export default FolderCardMenu;
