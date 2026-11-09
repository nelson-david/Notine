import { ReactNode } from "react";
import ScalePressable from "./ScalePressable";

/** 40×40 round button used in headers and toolbars. */
const IconButton = ({
    children,
    onPress,
    label,
    className = "",
}: {
    children: ReactNode;
    onPress: () => void;
    label: string;
    className?: string;
}) => (
    <ScalePressable
        haptic
        pressScale={0.9}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={6}
        className={`h-10 w-10 items-center justify-center rounded-full border border-line bg-surface ${className}`}
    >
        {children}
    </ScalePressable>
);

export default IconButton;
