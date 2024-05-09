import { SafeAreaView } from "react-native-safe-area-context";
import {
    FontFamilyStylesheet,
    cardColor,
    fontFamily,
    globalScrollViewStyle,
} from "../../styles/const";
import { ScrollView, StyleSheet, View } from "react-native";
import { singleNoteStyle } from "../../styles/app";
import { TextInput } from "react-native-gesture-handler";
import SNNavigationHeader from "../../components/header/SNNavigationHeader";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import React, { useEffect, useRef, useState } from "react";
import { updateNote } from "../../helpers/dbFunctions";
import { notesAtom } from "../../utils/jotaiAtom";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";

const SingleNoteScreen = ({ route }: { route: any }) => {
    const { id } = route.params;
    const { goBack } = useNavigation<Nav>();

    const editorRef = useRef();
    const [note, setNote] = useState<any>({});
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [notes, setNotes] = useAtom(notesAtom);

    useEffect(() => {
        let dummyNote = notes.find((nt) => nt.noteID === id);
        if (dummyNote) {
            setNote(dummyNote);
            setNoteTitle(dummyNote.title);
            setNoteContent(dummyNote.content);
        }
    }, []);

    const backAction = () => {
        try {
            updateNote(
                {
                    noteID: note.noteID,
                    folderID: note.folderID,
                    title: noteTitle,
                    content: noteContent,
                    favourite: false,
                    recycleBin: false,
                    pinned: false,
                    tag: "new content",
                },
                setNotes,
                () => {}
            );
        } finally {
            goBack();
        }
    };

    return (
        <SafeAreaView style={styles.noteScreen}>
            <SNNavigationHeader customFunction={backAction} />

            <ScrollView style={globalScrollViewStyle}>
                <View style={styles.noteScreen.contentView}>
                    <View style={styles.noteScreen.contentTextView}>
                        <TextInput
                            value={noteTitle}
                            onChangeText={(e) => setNoteTitle(e)}
                            style={styles.noteScreen.contentTextView.titleInput}
                            placeholder="Note Title"
                            placeholderTextColor="rgba(255,255,255,0.6)"
                        />
                        <RichEditor
                            ref={editorRef}
                            placeholder="Start writing..."
                            minimumFontSize={17}
                            editorStyle={{
                                backgroundColor: cardColor,
                                color: "rgba(255,255,255,0.8)",
                                placeholderColor: "rgba(255,255,255,0.5)",
                                initialCSSText: `${FontFamilyStylesheet}`,
                                contentCSSText: `font-family: ${fontFamily}; line-height: 2`,
                            }}
                            initialContentHTML={noteContent}
                            contentMode="mobile"
                            containerStyle={{
                                minHeight: 650,
                            }}
                            onChange={(descriptionText) =>
                                setNoteContent(descriptionText)
                            }
                        />
                    </View>
                    <View></View>
                </View>
            </ScrollView>
            <RichToolbar
                editor={editorRef}
                actions={[
                    actions.keyboard,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.insertImage,
                    actions.checkboxList,
                    actions.insertLink,
                    "customAction",
                ]}
                style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    margin: 0,
                    marginTop: 10,
                    marginBottom: 10,
                    width: "100%",
                    borderRadius: 20,
                    height: 68,
                    padding: 20,
                    position: "sticky",
                    bottom: 0,
                    left: 0,
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(singleNoteStyle);

export default SingleNoteScreen;
