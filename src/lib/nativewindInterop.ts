import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

// Third-party components don't understand `className` out of the box.
// Registering them here lets us style them with Tailwind classes too.
// Imported once from App.tsx before anything renders.
cssInterop(Animated.View, { className: "style" });
cssInterop(Animated.Text, { className: "style" });
cssInterop(Animated.ScrollView, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
});
cssInterop(BottomSheetTextInput, { className: "style" });
