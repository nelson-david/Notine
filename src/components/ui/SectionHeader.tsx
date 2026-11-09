import { Text, View } from "react-native";
import ScalePressable from "./ScalePressable";

const SectionHeader = ({
    title,
    count,
    actionLabel,
    onAction,
}: {
    title: string;
    count?: number;
    actionLabel?: string;
    onAction?: () => void;
}) => (
    <View className="mb-3 h-8 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
            <Text className="text-[17px] font-semibold text-ink">{title}</Text>
            {count !== undefined && count > 0 ? (
                <View className="h-5 min-w-[20px] items-center justify-center rounded-full bg-surface-2 px-1.5">
                    <Text className="text-[11px] font-semibold text-ink-muted">
                        {count}
                    </Text>
                </View>
            ) : null}
        </View>
        {actionLabel && onAction ? (
            <ScalePressable onPress={onAction} hitSlop={8}>
                <Text className="text-[14px] font-medium text-accent">
                    {actionLabel}
                </Text>
            </ScalePressable>
        ) : null}
    </View>
);

export default SectionHeader;
