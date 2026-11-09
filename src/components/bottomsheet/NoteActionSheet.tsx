import { View } from "react-native";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import AppSheet from "../ui/AppSheet";
import ActionRow from "../ui/ActionRow";
import TrashIcon from "../../assets/icons/TrashIcon";
import EditIcon from "../../assets/icons/EditIcon";
import LockIcon from "../../assets/icons/LockIcon";
import PinIcon from "../../assets/icons/PinIcon";
import {
    moveNoteToRecycleBin,
    updateNote,
} from "../../helpers/dbFunctions";
import { notesAtom } from "../../utils/jotaiAtom";
import { toastNotification } from "../../utils/toast";
import { Nav } from "../../utils/types";
import { useTheme } from "../../theme/useTheme";

const iconSize = { width: "20", height: "20" };

const NoteActionSheet = ({
    actionSheetRef,
    note,
    inEditor = false,
    onAfterDelete,
}: {
    actionSheetRef: any;
    note: any;
    /** Hides "Open note" when shown from inside the editor. */
    inEditor?: boolean;
    onAfterDelete?: () => void;
}) => {
    const { navigate } = useNavigation<Nav>();
    const { colors } = useTheme();
    const [, setNotes] = useAtom(notesAtom);
    const close = () => actionSheetRef.current?.close();

    const togglePin = () => {
        updateNote({ noteID: note.noteID, pinned: !note.pinned }, setNotes, close);
    };

    const deleteNote = () => {
        moveNoteToRecycleBin(
            note.noteID,
            setNotes,
            () => {
                close();
                onAfterDelete?.();
                toastNotification(
                    "success",
                    "Moved to Recycle bin",
                    "You can restore it from the Recycle bin"
                );
            },
            () =>
                toastNotification(
                    "error",
                    "Something went wrong",
                    "The note could not be moved to the Recycle bin"
                )
        );
    };

    return (
        <AppSheet ref={actionSheetRef} title={note.title || "Untitled"}>
            <View className="gap-2">
                {!inEditor ? (
                    <ActionRow
                        icon={<EditIcon size={iconSize} color={colors.ink} />}
                        label="Open note"
                        onPress={() => {
                            close();
                            navigate("SingleNote", { id: note.noteID });
                        }}
                    />
                ) : null}
                <ActionRow
                    icon={
                        <PinIcon
                            size={iconSize}
                            color={note.pinned ? colors.accent : colors.ink}
                        />
                    }
                    label={note.pinned ? "Unpin" : "Pin to top"}
                    onPress={togglePin}
                />
                <ActionRow
                    icon={<LockIcon size={iconSize} color={colors.ink} />}
                    label="Lock note"
                    onPress={() =>
                        toastNotification(
                            "info",
                            "Coming soon",
                            "Note lock is still under development"
                        )
                    }
                />
                <ActionRow
                    danger
                    icon={<TrashIcon size={iconSize} color={colors.accent} />}
                    label="Move to Recycle bin"
                    onPress={deleteNote}
                />
            </View>
        </AppSheet>
    );
};

export default NoteActionSheet;
