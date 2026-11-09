import { useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import { useAtom } from "jotai";
import Screen from "../../components/ui/Screen";
import Container from "../../components/ui/Container";
import HomeHeader from "../../components/header/HomeHeader";
import PinnedNotes from "../../components/section/PinnedNotes";
import RecentNotes from "../../components/section/RecentNotes";
import MyFolders from "../../components/section/MyFolders";
import CreateFolderSheet from "../../components/bottomsheet/CreateFolderSheet";
import { notesAtom } from "../../utils/jotaiAtom";

const HomeScreen = () => {
    const [notes] = useAtom<any[]>(notesAtom as any);
    const folderSheetRef = useRef<any>();

    const { liveNotes, pinnedNotes, recentNotes } = useMemo(() => {
        const live = notes.filter((note: any) => !note.recycleBin);
        return {
            liveNotes: live,
            pinnedNotes: live.filter((note: any) => note.pinned),
            // Most recently edited first; older notes without timestamps
            // keep their saved order after them (sort is stable).
            recentNotes: live
                .filter((note: any) => !note.pinned)
                .sort(
                    (a: any, b: any) =>
                        (b.updatedAt ?? b.createdAt ?? 0) -
                        (a.updatedAt ?? a.createdAt ?? 0)
                ),
        };
    }, [notes]);

    return (
        <Screen>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="never"
            >
                <Container>
                    <HomeHeader />
                    <PinnedNotes pinnedNotes={pinnedNotes} />
                    <RecentNotes
                        notes={recentNotes}
                        hasAnyNotes={liveNotes.length > 0}
                    />
                    <MyFolders folderSheetRef={folderSheetRef} />
                </Container>
            </ScrollView>
            <CreateFolderSheet folderSheetRef={folderSheetRef} />
        </Screen>
    );
};

export default HomeScreen;
