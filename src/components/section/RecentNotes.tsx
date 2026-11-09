import Animated from "react-native-reanimated";
import SectionHeader from "../ui/SectionHeader";
import Grid, { useColumns } from "../ui/Grid";
import PreviewNoteCard from "../card/PreviewNoteCard";
import NoData from "../misc/NoData";
import EditIcon from "../../assets/icons/EditIcon";
import { enterSection, layoutSpring } from "../../styles/motion";

/** Most recent (unpinned) notes — two rows' worth on any screen size. */
const RecentNotes = ({
    notes,
    hasAnyNotes,
}: {
    notes: any[];
    hasAnyNotes: boolean;
}) => {
    const columns = useColumns();
    // Everything is pinned: the Pinned section already shows it all.
    if (notes.length === 0 && hasAnyNotes) return null;

    return (
        <Animated.View
            entering={enterSection(90)}
            layout={layoutSpring}
            className="pt-6"
        >
            <SectionHeader title="Recent" />
            {notes.length === 0 ? (
                <NoData
                    compact
                    icon={<EditIcon size={{ width: "22", height: "22" }} />}
                    customHeaderText="No notes yet"
                    customCaptionText="Create a folder below, then add your first note to it"
                />
            ) : (
                <Grid
                    data={notes.slice(0, columns * 2)}
                    keyExtractor={(note) => note.noteID}
                    renderItem={(note) => <PreviewNoteCard note={note} />}
                />
            )}
        </Animated.View>
    );
};

export default RecentNotes;
