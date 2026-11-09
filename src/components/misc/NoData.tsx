import { ReactNode } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { enterSection } from "../../styles/motion";

/** Centered empty state with an optional icon. */
const NoData = ({
    customHeaderText,
    customCaptionText,
    icon,
    compact = false,
}: {
    customHeaderText?: string;
    customCaptionText?: string;
    icon?: ReactNode;
    compact?: boolean;
}) => (
    <Animated.View
        entering={enterSection(60)}
        className={`w-full items-center justify-center px-6 ${
            compact
                ? "rounded-3xl border border-dashed border-line py-10"
                : "py-28"
        }`}
    >
        {icon ? (
            <View className="mb-4 h-14 w-14 items-center justify-center rounded-full border border-line bg-surface">
                {icon}
            </View>
        ) : null}
        <Text className="text-center text-[17px] font-semibold text-ink">
            {customHeaderText ?? "No notes"}
        </Text>
        <Text className="mt-1.5 max-w-[280px] text-center text-[14px] leading-5 text-ink-muted">
            {customCaptionText ?? "Tap the add button to create a new note"}
        </Text>
    </Animated.View>
);

export default NoData;
