import { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ScalePressable from "./ScalePressable";
import { useTheme } from "../../theme/useTheme";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const variants: Record<Variant, { box: string; text: string }> = {
    // Inverse of the page: black on light mode, white on dark mode.
    primary: { box: "bg-ink", text: "text-canvas" },
    secondary: { box: "bg-surface-2", text: "text-ink" },
    danger: { box: "bg-accent", text: "text-accent-fg" },
    ghost: { box: "bg-transparent", text: "text-ink-muted" },
};

const Button = ({
    label,
    onPress,
    variant = "secondary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
    className = "",
}: {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    size?: "sm" | "md";
    loading?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    className?: string;
}) => {
    const { colors } = useTheme();
    const v = variants[variant];
    const sizing = size === "sm" ? "h-9 px-3.5" : "h-12 px-5";
    const textSize = size === "sm" ? "text-[13px]" : "text-[15px]";
    const spinner =
        variant === "primary"
            ? colors.canvas
            : variant === "danger"
            ? colors.onAccent
            : colors.ink;

    return (
        <ScalePressable
            haptic
            onPress={loading ? undefined : onPress}
            disabled={disabled}
            className={`flex-row items-center justify-center rounded-full ${sizing} ${v.box} ${className}`}
        >
            {loading ? (
                <ActivityIndicator size="small" color={spinner} />
            ) : (
                <View className="flex-row items-center gap-1.5">
                    {icon}
                    <Text
                        numberOfLines={1}
                        className={`font-semibold ${textSize} ${v.text}`}
                    >
                        {label}
                    </Text>
                </View>
            )}
        </ScalePressable>
    );
};

export default Button;
