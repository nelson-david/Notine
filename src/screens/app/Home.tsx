import { ScrollView, StyleSheet } from "react-native";
import {
    accentColor,
    globalScrollViewStyle,
    globalSidePadding,
    whiteColor,
} from "../../styles/const";
import { homeScreenStyle } from "../../styles/app";
import HomeHeader from "../../components/header/HomeHeader";
import PinnedNotes from "../../components/section/PinnedNotes";
import RecentNotes from "../../components/section/RecentNotes";
import MyFolders from "../../components/section/MyFolders";
import CreateFolderSheet from "../../components/bottomsheet/CreateFolderSheet";
import { useEffect, useRef, useState } from "react";
import { notesAtom } from "../../utils/jotaiAtom";
import { useAtom } from "jotai";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP } from "react-native-responsive-screen";

const HomeScreen = () => {
    const [notes, _] = useAtom(notesAtom);
    const [allNotes, setAllNotes] = useState<any>([]);
    const [pinnedNotes, setPinnedNotes] = useState<any>([]);
    const folderSheetRef = useRef<any>();

    const isEven = (number: number) => {
        return number % 2 === 0;
    };

    useEffect(() => {
        const dPN: any = [];
        const allDummyNotes: any = [];

        notes.map((note) => {
            if (!note.recycleBin) {
                allDummyNotes.push(note);
            }
        });

        allDummyNotes.map((note: any, index: number) => {
            const color = isEven(index + 1) ? whiteColor : accentColor;
            if (note.pinned) {
                dPN.push({ ...note, color });
            }
        });

        setPinnedNotes(dPN);
        setAllNotes(allDummyNotes);
    }, [notes]);

    return (
        <SafeAreaView style={styles.homeScreen}>
            <ScrollView
                style={{
                    ...globalScrollViewStyle,
                    width: "100%",
                    height: "100%",
                    paddingLeft: globalSidePadding,
                    paddingRight: globalSidePadding,
                }}
                contentContainerStyle={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                }}
            >
                <HomeHeader />
                <PinnedNotes pinnedNotes={pinnedNotes} />
                <RecentNotes notes={allNotes.slice(0, 4)} />
                <MyFolders
                    folderSheetRef={folderSheetRef}
                    notesExist={allNotes.length !== 0 ? true : false}
                />
            </ScrollView>
            <CreateFolderSheet folderSheetRef={folderSheetRef} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(homeScreenStyle);

export default HomeScreen;
