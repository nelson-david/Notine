import Animated from "react-native-reanimated";
import SectionHeader from "../ui/SectionHeader";
import Grid from "../ui/Grid";
import PreviewNoteCard from "../card/PreviewNoteCard";
import { enterSection, layoutSpring } from "../../styles/motion";

const PinnedNotes = ({ pinnedNotes }: { pinnedNotes: any[] }) => {
    if (pinnedNotes.length === 0) return null;

    return (
        <Animated.View
            entering={enterSection(40)}
            layout={layoutSpring}
            className="pt-6"
        >
            <SectionHeader title="Pinned" count={pinnedNotes.length} />
            <Grid
                data={pinnedNotes}
                keyExtractor={(note) => note.noteID}
                renderItem={(note) => <PreviewNoteCard note={note} />}
            />
        </Animated.View>
    );
};

export default PinnedNotes;
