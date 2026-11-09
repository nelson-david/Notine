import { useRef } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScalePressable from "../ui/ScalePressable";
import NoteActionSheet from "../bottomsheet/NoteActionSheet";
import PinIcon from "../../assets/icons/PinIcon";
import { Nav } from "../../utils/types";
import { getContentPreview } from "../../utils/recycleBin";
import { formatRelative } from "../../utils/format";
import { useTheme } from "../../theme/useTheme";

/**
 * Note tile for grids (fills the width it's given). Tap to open,
 * long-press for actions.
 */
const PreviewNoteCard = ({ note }: { note: any }) => {
    const actionSheetRef = useRef<any>();
    const { navigate } = useNavigation<Nav>();
    const { colors } = useTheme();

    const preview = getContentPreview(note.content, 120);
    const when = formatRelative(note.updatedAt ?? note.createdAt);

    return (
        <>
            <ScalePressable
                onPress={() => navigate("SingleNote", { id: note.noteID })}
                onLongPress={() => actionSheetRef.current?.open()}
                delayLongPress={280}
                accessibilityRole="button"
                accessibilityLabel={`Note ${note.title || "Untitled"}`}
                accessibilityHint="Long press for more options"
                className="h-[164px] justify-between overflow-hidden rounded-[20px] border border-line bg-surface p-4"
            >
                <View className="flex-1">
                    <Text
                        numberOfLines={2}
                        className="text-[15px] font-semibold leading-5 text-ink"
                    >
                        {note.title || "Untitled"}
                    </Text>
                    <Text
                        numberOfLines={3}
                        className="mt-1.5 text-[13px] leading-[18px] text-ink-muted"
                    >
                        {preview || "No content"}
                    </Text>
                </View>

                <View className="h-5 flex-row items-center justify-between">
                    <Text className="text-[12px] text-ink-subtle">{when}</Text>
                    {note.pinned ? (
                        <PinIcon
                            size={{ width: "14", height: "14" }}
                            color={colors.accent}
                        />
                    ) : null}
                </View>
            </ScalePressable>
            <NoteActionSheet note={note} actionSheetRef={actionSheetRef} />
        </>
    );
};

export default PreviewNoteCard;
