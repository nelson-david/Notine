import { ReactNode } from "react";
import { Text, View } from "react-native";
import ScalePressable from "./ScalePressable";

/** A tappable icon + label row, used in action sheets. */
const ActionRow = ({
    icon,
    label,
    onPress,
    danger = false,
}: {
    icon: ReactNode;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) => (
    <ScalePressable
        haptic
        pressScale={0.98}
        onPress={onPress}
        className="h-14 flex-row items-center gap-3.5 rounded-2xl bg-surface-2 px-4"
    >
        <View className="w-6 items-center">{icon}</View>
        <Text
            className={`text-[16px] font-medium ${
                danger ? "text-accent" : "text-ink"
            }`}
        >
            {label}
        </Text>
    </ScalePressable>
);

export default ActionRow;
