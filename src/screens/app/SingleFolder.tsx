import { useMemo } from "react";
import { ScrollView } from "react-native";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/ui/Screen";
import Container from "../../components/ui/Container";
import Grid from "../../components/ui/Grid";
import Fab from "../../components/ui/Fab";
import NavigationHeaderBar from "../../components/header/NavigationHeader";
import PreviewNoteCard from "../../components/card/PreviewNoteCard";
import NoData from "../../components/misc/NoData";
import PlusIcon from "../../assets/icons/PlusIcon";
import EditIcon from "../../assets/icons/EditIcon";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import { Nav } from "../../utils/types";
import { useTheme } from "../../theme/useTheme";

const SingleFolderScreen = ({ route }: { route: any }) => {
    const { navigate } = useNavigation<Nav>();
    const { colors } = useTheme();
    const [notes] = useAtom<any[]>(notesAtom as any);
    const [folders] = useAtom<any[]>(foldersAtom as any);

    // Prefer the live folder so renames show up immediately.
    const folder =
        folders.find((f: any) => f.folderID === route.params.folder.folderID) ??
        route.params.folder;

    const folderNotes = useMemo(
        () =>
            notes
                .filter(
                    (note: any) =>
                        note.folderID === folder.folderID && !note.recycleBin
                )
                .sort(
                    (a: any, b: any) =>
                        Number(!!b.pinned) - Number(!!a.pinned) ||
                        (b.updatedAt ?? b.createdAt ?? 0) -
                            (a.updatedAt ?? a.createdAt ?? 0)
                ),
        [notes, folder.folderID]
    );

    return (
        <Screen>
            <NavigationHeaderBar
                title={folder.name}
                subtitle={`${folderNotes.length} ${
                    folderNotes.length === 1 ? "note" : "notes"
                }`}
            />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Container className="pb-32 pt-4">
                    {folderNotes.length === 0 ? (
                        <NoData
                            icon={<EditIcon size={{ width: "22", height: "22" }} />}
                            customHeaderText="This folder is empty"
                            customCaptionText="Tap New note to write your first one"
                        />
                    ) : (
                        <Grid
                            data={folderNotes}
                            keyExtractor={(note) => note.noteID}
                            renderItem={(note) => <PreviewNoteCard note={note} />}
                        />
                    )}
                </Container>
            </ScrollView>
            <Fab
                icon={
                    <PlusIcon
                        size={{ width: "20", height: "20" }}
                        color={colors.onAccent}
                    />
                }
                label="New note"
                onPress={() => navigate("NewNote", { folder })}
            />
        </Screen>
    );
};

export default SingleFolderScreen;
