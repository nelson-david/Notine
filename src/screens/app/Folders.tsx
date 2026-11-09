import { useRef } from "react";
import { ScrollView } from "react-native";
import { useAtom } from "jotai";
import Screen from "../../components/ui/Screen";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import NavigationHeaderBar from "../../components/header/NavigationHeader";
import FolderCard, { NewFolderCard } from "../../components/card/FolderCard";
import CreateFolderSheet from "../../components/bottomsheet/CreateFolderSheet";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";

const FoldersScreen = () => {
    const [folders] = useAtom<any[]>(foldersAtom as any);
    const [notes] = useAtom<any[]>(notesAtom as any);
    const folderSheetRef = useRef<any>();
    const count = folders?.length ?? 0;

    return (
        <Screen>
            <NavigationHeaderBar
                title="Folders"
                subtitle={`${count} ${count === 1 ? "folder" : "folders"}`}
            />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Container className="pb-12 pt-4">
                    <Grid
                        data={folders ?? []}
                        keyExtractor={(folder) => folder.folderID}
                        renderItem={(folder) => (
                            <FolderCard folder={folder} notes={notes} />
                        )}
                        footer={
                            <NewFolderCard
                                onPress={() => folderSheetRef.current?.open()}
                            />
                        }
                    />
                </Container>
            </ScrollView>
            <CreateFolderSheet folderSheetRef={folderSheetRef} />
        </Screen>
    );
};

export default FoldersScreen;
