import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** Full-screen themed container that respects the device's safe areas. */
const Screen = ({
    children,
    edges = ["top"],
}: {
    children: ReactNode;
    edges?: ("top" | "bottom")[];
}) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            className="flex-1 bg-canvas"
            style={{
                paddingTop: edges.includes("top") ? insets.top : 0,
                paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
            }}
        >
            {children}
        </View>
    );
};

export default Screen;
