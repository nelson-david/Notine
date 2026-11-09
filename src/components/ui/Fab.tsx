import { ReactNode } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScalePressable from "./ScalePressable";
import { popIn } from "../../styles/motion";

/** Floating action button pinned to the bottom-right corner. */
const Fab = ({
    icon,
    label,
    onPress,
}: {
    icon: ReactNode;
    label?: string;
    onPress: () => void;
}) => {
    const insets = useSafeAreaInsets();
    return (
        <Animated.View
            entering={popIn.delay(200)}
            className="absolute right-5"
            style={{ bottom: Math.max(insets.bottom, 12) + 12 }}
        >
            <ScalePressable
                haptic
                pressScale={0.94}
                onPress={onPress}
                className="h-14 flex-row items-center gap-2 rounded-full bg-accent pl-4 pr-5"
                style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.18,
                    shadowRadius: 14,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 6,
                }}
            >
                <View>{icon}</View>
                {label ? (
                    <Text className="text-[15px] font-semibold text-accent-fg">
                        {label}
                    </Text>
                ) : null}
            </ScalePressable>
        </Animated.View>
    );
};

export default Fab;
