import { useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScalePressable from "../ui/ScalePressable";
import FolderCardMenu from "../misc/FolderCardMenu";
import UnlockFolderSheet from "../bottomsheet/UnlockFolderSheet";
import FolderIcon from "../../assets/icons/FolderIcon";
import LockIcon from "../../assets/icons/LockIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { Nav } from "../../utils/types";
import { getFolderNoteCount } from "../../utils/getFolderNoteCount";
import { readableOn } from "../../utils/format";
import { useTheme } from "../../theme/useTheme";

const CARD = "h-[136px] rounded-[20px] p-4";

/** Folder tile for grids (fills the width it's given). */
const FolderCard = ({ folder, notes }: { folder: any; notes: any[] }) => {
    const unlockSheetRef = useRef<any>();
    const { navigate } = useNavigation<Nav>();
    const { colors } = useTheme();
    const noteCount = useMemo(
        () => getFolderNoteCount(folder.folderID, notes),
        [folder.folderID, notes]
    );

    const openFolder = () => {
        if (folder.locked) unlockSheetRef.current?.open();
        else navigate("SingleFolder", { folder });
    };

    return (
        <>
            <ScalePressable
                onPress={openFolder}
                accessibilityRole="button"
                accessibilityLabel={`Folder ${folder.name}, ${noteCount} notes`}
                className={`${CARD} justify-between border border-line bg-surface`}
            >
                <View className="flex-row items-start justify-between">
                    <View
                        className="h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: folder.color }}
                    >
                        <FolderIcon
                            color={readableOn(folder.color)}
                            size={{ height: "20", width: "20" }}
                        />
                    </View>
                    {folder.locked ? (
                        <LockIcon
                            size={{ height: "16", width: "16" }}
                            color={colors.inkMuted}
                        />
                    ) : null}
                </View>

                <View className="flex-row items-end justify-between">
                    <View className="flex-1 pr-2">
                        <Text
                            numberOfLines={1}
                            className="text-[15px] font-semibold text-ink"
                        >
                            {folder.name}
                        </Text>
                        <Text className="mt-0.5 text-[13px] text-ink-muted">
                            {noteCount} {noteCount === 1 ? "note" : "notes"}
                        </Text>
                    </View>
                    <FolderCardMenu folder={folder} />
                </View>
            </ScalePressable>
            <UnlockFolderSheet folder={folder} unlockSheetRef={unlockSheetRef} />
        </>
    );
};

/** Matching dashed tile for creating a folder. */
export const NewFolderCard = ({ onPress }: { onPress: () => void }) => {
    const { colors } = useTheme();
    return (
        <ScalePressable
            haptic
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel="Create a new folder"
            className={`${CARD} items-center justify-center gap-2 border border-dashed border-line`}
        >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-surface-2">
                <PlusIcon size={{ width: "20", height: "20" }} color={colors.ink} />
            </View>
            <Text className="text-[14px] font-medium text-ink-muted">
                New folder
            </Text>
        </ScalePressable>
    );
};

export default FolderCard;
