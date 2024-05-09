import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import NavigationHeaderBar from "../../components/header/NavigationHeader";
import PreviewNoteCard from "../../components/card/PreviewNoteCard";
import {
    accentColor,
    appColor,
    cardColor,
    globalSidePadding,
    globalScrollViewStyle,
    whiteColor,
} from "../../styles/const";
import { FloatingAction } from "react-native-floating-action";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";
import { useAtom } from "jotai";
import { notesAtom } from "../../utils/jotaiAtom";
import NoData from "../../components/misc/NoData";

const actions = [
    {
        text: "New Note",
        name: "new_note",
        icon: require("../../assets/images/icons/newNote.png"),
        position: 2,
        color: cardColor,
    },
];

const SingleFolderScreen = ({ route }: { route: any }) => {
    const { navigate } = useNavigation<Nav>();
    const [folder, setFolder] = useState<any>({});
    const [notes, _] = useAtom(notesAtom);
    const [folderNotes, setFolderNotes] = useState<any[]>([]);

    useEffect(() => {
        setFolder(route.params.folder);
        const dummyNotes: any[] = [];
        notes.map((note) => {
            if (note.folderID === route.params.folder.folderID) {
                dummyNotes.unshift(note);
            }
        });
        setFolderNotes(dummyNotes);
    }, [notes]);

    return (
        <>
            <SafeAreaView style={styles.singleFolderScreen}>
                <NavigationHeaderBar title={folder.name} />
                <ScrollView
                    style={{
                        ...globalScrollViewStyle,
                        width: "100%",
                        height: "100%",
                        paddingLeft: globalSidePadding,
                        paddingRight: globalSidePadding,
                    }}
                >
                    <View style={styles.singleFolderScreen.noteList}>
                        <View
                            style={styles.singleFolderScreen.noteListContainer}
                        >
                            {folderNotes.length === 0 ? (
                                <NoData />
                            ) : (
                                <>
                                    {folderNotes
                                        .reverse()
                                        .map((note: any, index: number) => {
                                            return (
                                                <PreviewNoteCard
                                                    note={note}
                                                    key={index}
                                                    strictColor
                                                />
                                            );
                                        })}
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
                <FloatingAction
                    actions={actions}
                    onPressItem={() => navigate("NewNote", { folder })}
                    color={accentColor}
                    overlayColor="rgba(0,0,0,0.6)"
                    tintColor={whiteColor}
                    buttonSize={wp(15)}
                    iconHeight={20}
                    iconWidth={20}
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    singleFolderScreen: {
        paddingTop: Platform.OS === "android" ? 5 : 0,
        width: "100%",
        height: "100%",
        backgroundColor: appColor,
        flex: 1,
        alignItems: "center",
        noteList: {
            paddingTop: 20,
            paddingBottom: 20,
        },
        noteListContainer: {
            paddingTop: 15,
            paddingBottom: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 25,
        },
    },
} as any);

export default SingleFolderScreen;
