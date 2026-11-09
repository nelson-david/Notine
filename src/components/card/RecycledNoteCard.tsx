import { Text, View } from "react-native";
import Button from "../ui/Button";
import TrashIcon from "../../assets/icons/TrashIcon";
import RestoreIcon from "../../assets/icons/RestoreIcon";
import { formatDeletedAt, getContentPreview } from "../../utils/recycleBin";
import { useTheme } from "../../theme/useTheme";

const Chip = ({ label }: { label: string }) => (
    <View className="h-6 justify-center rounded-full bg-surface-2 px-2.5">
        <Text numberOfLines={1} className="text-[12px] text-ink-muted">
            {label}
        </Text>
    </View>
);

/** A note in the Recycle bin with Restore / Delete forever actions. */
const RecycledNoteCard = ({
    note,
    folderName,
    disabled,
    onRestore,
    onDeleteForever,
}: {
    note: any;
    folderName?: string;
    disabled?: boolean;
    onRestore: () => void;
    onDeleteForever: () => void;
}) => {
    const { colors } = useTheme();
    const preview = getContentPreview(note.content);

    return (
        <View className="rounded-[20px] border border-line bg-surface p-4">
            <Text numberOfLines={1} className="text-[16px] font-semibold text-ink">
                {note.title || "Untitled"}
            </Text>
            {preview ? (
                <Text
                    numberOfLines={2}
                    className="mt-1 text-[14px] leading-5 text-ink-muted"
                >
                    {preview}
                </Text>
            ) : null}

            <View className="mt-3 flex-row flex-wrap gap-1.5">
                <Chip label={formatDeletedAt(note.deletedAt)} />
                <Chip label={folderName ?? "Folder deleted"} />
            </View>

            <View className="mt-4 flex-row gap-2">
                <Button
                    size="sm"
                    variant="secondary"
                    label="Restore"
                    icon={
                        <RestoreIcon
                            size={{ width: "15", height: "15" }}
                            color={colors.ink}
                        />
                    }
                    onPress={onRestore}
                    disabled={disabled}
                    className="flex-1"
                />
                <Button
                    size="sm"
                    variant="danger"
                    label="Delete forever"
                    icon={
                        <TrashIcon
                            size={{ width: "15", height: "15" }}
                            color={colors.onAccent}
                        />
                    }
                    onPress={onDeleteForever}
                    disabled={disabled}
                    className="flex-1"
                />
            </View>
        </View>
    );
};

export default RecycledNoteCard;
