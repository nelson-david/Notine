import Animated from "react-native-reanimated";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import SectionHeader from "../ui/SectionHeader";
import Grid, { useColumns } from "../ui/Grid";
import FolderCard, { NewFolderCard } from "../card/FolderCard";
import { foldersAtom, notesAtom } from "../../utils/jotaiAtom";
import { Nav } from "../../utils/types";
import { enterSection, layoutSpring } from "../../styles/motion";

/** First few folders plus a "New folder" tile, filling two rows. */
const MyFolders = ({ folderSheetRef }: { folderSheetRef: any }) => {
    const { navigate } = useNavigation<Nav>();
    const [folders] = useAtom<any[]>(foldersAtom as any);
    const [notes] = useAtom<any[]>(notesAtom as any);
    const columns = useColumns();
    const all = folders ?? [];
    const shown = all.slice(0, columns * 2 - 1);

    return (
        <Animated.View
            entering={enterSection(140)}
            layout={layoutSpring}
            className="pb-12 pt-6"
        >
            <SectionHeader
                title="Folders"
                count={all.length}
                actionLabel={all.length > 0 ? "See all" : undefined}
                onAction={() => navigate("Folder")}
            />
            <Grid
                data={shown}
                keyExtractor={(folder) => folder.folderID}
                renderItem={(folder) => <FolderCard folder={folder} notes={notes} />}
                footer={
                    <NewFolderCard onPress={() => folderSheetRef.current?.open()} />
                }
            />
        </Animated.View>
    );
};

export default MyFolders;
