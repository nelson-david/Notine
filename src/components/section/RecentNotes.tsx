import { StyleSheet, Text, View } from "react-native";
import { whiteColor } from "../../styles/const";
import PreviewNoteCard from "../card/PreviewNoteCard";
import NoData from "../misc/NoData";

const RecentNotes = ({ notes }: { notes: any }) => {
    return (
        <View style={styles.recentNotes}>
            {notes.length === 0 ? (
                <View style={styles.emptyNotes}>
                    <NoData customCaptionText="Tap the Add button to create a new notes folder" />
                </View>
            ) : (
                <>
                    <Text style={styles.titleText}>Today</Text>
                    <View style={styles.previewNotesContainer}>
                        {notes.map((note: any, index: number) => {
                            return (
                                <PreviewNoteCard
                                    note={note}
                                    key={index}
                                    strictColor
                                />
                            );
                        })}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    recentNotes: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "100%",
    },
    titleText: {
        color: whiteColor,
        fontSize: 22,
        fontFamily: "NothingFont",
        paddingTop: 5,
        paddingBottom: 5,
    },
    previewNotesContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 25,
        justifyContent: "space-between",
    },
    emptyNotes: {
        paddingLeft: 20,
        paddingRight: 20,
    },
} as any);

export default RecentNotes;
