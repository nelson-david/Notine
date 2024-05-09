import RBSheet from "react-native-raw-bottom-sheet";
import { accentColor, globalSheetStyle, whiteColor } from "../../styles/const";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { updateNote } from "../../helpers/dbFunctions";
import { useAtom } from "jotai";
import { notesAtom } from "../../utils/jotaiAtom";
import TrashIcon from "../../assets/icons/TrashIcon";
import EditIcon from "../../assets/icons/EditIcon";
import LockIcon from "../../assets/icons/LockIcon";
import { toastNotification } from "../../utils/toast";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";
import PinIcon from "../../assets/icons/PinIcon";

const NoteActionSheet = ({
    actionSheetRef,
    note,
}: {
    actionSheetRef: any;
    note: any;
}) => {
    const { navigate } = useNavigation<Nav>();
    const [_, setNotes] = useAtom(notesAtom);

    const pinNote = () => {
        updateNote(
            {
                noteID: note.noteID,
                folderID: note.folderID,
                title: note.title,
                content: note.content,
                favourite: false,
                recycleBin: false,
                pinned: true,
                tag: "new content",
            },
            setNotes,
            () => {}
        );
    };

    const deleteNote = () => {
        updateNote(
            {
                noteID: note.noteID,
                folderID: note.folderID,
                title: note.title,
                content: note.content,
                favourite: false,
                recycleBin: true,
                pinned: true,
                tag: "new content",
            },
            setNotes,
            () => {}
        );
    };

    return (
        <RBSheet
            ref={actionSheetRef}
            customStyles={styles.modalStyle}
            customModalProps={{
                animationType: "slide",
                statusBarTranslucent: true,
            }}
            useNativeDriver
            openDuration={150}
            closeDuration={150}
            height={hp(21)}
            draggable
        >
            <Text style={{ ...styles.title, fontSize: 16 }}>Note Action</Text>
            <View style={styles.contentDiv}>
                <View style={styles.contentDiv.actionContents}>
                    <Pressable onPress={deleteNote}>
                        <TrashIcon size={{ width: "20", height: "20" }} />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigate("SingleNote", { id: note.noteID });
                            actionSheetRef.current.close();
                        }}
                    >
                        <EditIcon size={{ width: "20", height: "20" }} />
                    </Pressable>
                    <Pressable onPress={pinNote}>
                        <PinIcon
                            size={{ width: "20", height: "20" }}
                            color={note.pinned ? accentColor : whiteColor}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            toastNotification(
                                "error",
                                "Under Development",
                                "Note lock feature is still under development"
                            )
                        }
                    >
                        <LockIcon size={{ width: "20", height: "20" }} />
                    </Pressable>
                </View>
            </View>
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    ...globalSheetStyle,
    contentDiv: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        actionContents: {
            padding: 7,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "row",
            justifyContent: "space-between",
        },
    },
});

export default NoteActionSheet;
