import { Pressable, StyleSheet, Text, View } from "react-native";
import { accentColor, cardColor, whiteColor } from "../../styles/const";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";
import { useRef } from "react";
import NoteActionSheet from "../bottomsheet/NoteActionSheet";

const PreviewNoteCard = ({
    note,
    strictColor,
}: {
    note: any;
    strictColor?: boolean;
}) => {
    const actionSheetRef = useRef<any>();
    const { navigate } = useNavigation<Nav>();
    return (
        <>
            <Pressable
                style={
                    strictColor
                        ? {
                              ...styles.previewNoteCard,
                              backgroundColor: cardColor,
                          }
                        : {
                              ...styles.previewNoteCard,
                              backgroundColor: note.color,
                              height: 140,
                          }
                }
                onPress={() => navigate("SingleNote", { id: note.noteID })}
                onLongPress={() => actionSheetRef.current.open()}
            >
                <Text
                    style={
                        strictColor
                            ? { ...styles.titleText, color: "#ffffff" }
                            : note.color === "#ffffff"
                            ? styles.titleText
                            : { ...styles.titleText, color: "#ffffff" }
                    }
                >
                    {note.title}
                </Text>
                <View style={styles.tagView}>
                    <Pressable
                        style={
                            strictColor
                                ? {
                                      ...styles.tagView.button,
                                      backgroundColor: accentColor,
                                  }
                                : note.color === "#ffffff"
                                ? styles.tagView.button
                                : {
                                      ...styles.tagView.button,
                                      backgroundColor: "white",
                                  }
                        }
                    >
                        <Text
                            style={
                                strictColor
                                    ? {
                                          ...styles.tagView.button.text,
                                          color: "#ffffff",
                                      }
                                    : note.color === "#ffffff"
                                    ? styles.tagView.button.text
                                    : {
                                          ...styles.tagView.button.text,
                                          color: accentColor,
                                      }
                            }
                        >
                            #{note.tag}
                        </Text>
                    </Pressable>
                </View>
            </Pressable>
            <NoteActionSheet note={note} actionSheetRef={actionSheetRef} />
        </>
    );
};

const styles = StyleSheet.create({
    previewNoteCard: {
        width: "46%",
        height: 170,
        borderRadius: 20,
        padding: 15,
        paddingTop: 18,
    },
    titleText: {
        fontSize: 17,
        letterSpacing: 0.1,
        paddingRight: 30,
        lineHeight: 25,
        fontFamily: "SCPRegularFont",
        color: "rgba(0,0,0,0.75)",
        opacity: 0.8,
    },
    tagView: {
        position: "absolute",
        bottom: 15,
        left: 15,
        flexDirection: "row",
        button: {
            borderRadius: 15,
            padding: 5,
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: accentColor,
            text: {
                fontFamily: "SCPRegularFont",
                fontSize: 10,
                color: whiteColor,
                letterSpacing: -0.6,
                paddingBottom: 0.8,
            },
        },
    },
} as any);

export default PreviewNoteCard;
