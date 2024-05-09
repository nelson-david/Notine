import { globalScrollViewStyle, globalSidePadding } from "../../styles/const";
import { ScrollView, StyleSheet, View } from "react-native";
import { myFoldersStyle } from "../../styles/app";
import { useAtom } from "jotai";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import { useEffect } from "react";
import NavigationHeaderBar from "../../components/header/NavigationHeader";
import FolderCard from "../../components/card/FolderCard";
import { SafeAreaView } from "react-native-safe-area-context";

const FoldersScreen = () => {
    const [folders, _] = useAtom(foldersAtom);
    const [notes, __] = useAtom(notesAtom);

    useEffect(() => {
        console.log("FOLDER PAGE: ", folders);
    }, []);

    return (
        <SafeAreaView style={styles.foldersScreen}>
            <NavigationHeaderBar title="My Folders" />
            <ScrollView
                style={{
                    ...globalScrollViewStyle,
                    width: "100%",
                    height: "100%",
                    paddingLeft: globalSidePadding,
                    paddingRight: globalSidePadding,
                }}
            >
                <View style={styles.foldersScreen.folderList}>
                    {folders ? (
                        folders.map((folder, index: number) => {
                            return (
                                <FolderCard
                                    key={index}
                                    folder={folder}
                                    notes={notes}
                                />
                            );
                        })
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(myFoldersStyle);

export default FoldersScreen;
