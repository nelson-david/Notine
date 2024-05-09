import { StyleSheet, Text, View } from "react-native";
import { whiteColor } from "../../styles/const";
import PreviewNoteCard from "../card/PreviewNoteCard";

const PinnedNotes = ({ pinnedNotes }: { pinnedNotes: any }) => {
    return (
        <>
            {pinnedNotes.length !== 0 ? (
                <View style={styles.pinnedNotes}>
                    <Text style={styles.titleText}>Pinned</Text>
                    <View style={styles.previewNotesContainer}>
                        {pinnedNotes.map((note: any, index: number) => {
                            return <PreviewNoteCard note={note} key={index} />;
                        })}
                    </View>
                </View>
            ) : (
                <View style={styles.pinnedNotes}></View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    pinnedNotes: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
    },
    titleText: {
        color: whiteColor,
        fontSize: 22,
        fontFamily: "NothingFont",
        paddingTop: 10,
        paddingBottom: 10,
    },
    previewNotesContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 25,
    },
} as any);

export default PinnedNotes;
