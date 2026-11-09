import { ReactNode } from "react";
import {
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { cssInterop } from "nativewind";
import { pressSpring } from "../../styles/motion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
cssInterop(AnimatedPressable, { className: "style" });

type Props = Omit<PressableProps, "style" | "children"> & {
    className?: string;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    /** How far the element shrinks while pressed (1 = no shrink). */
    pressScale?: number;
    /** Light haptic tick on press. Long presses always get a medium tick. */
    haptic?: boolean;
};

/**
 * Pressable that eases down while held and springs back on release.
 * Use it for anything tappable so the whole app shares the same feel.
 */
const ScalePressable = ({
    className,
    style,
    children,
    pressScale = 0.97,
    haptic = false,
    onPressIn,
    onPressOut,
    onPress,
    onLongPress,
    disabled,
    ...rest
}: Props) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = (e: GestureResponderEvent) => {
        if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
    };

    const handleLongPress = onLongPress
        ? (e: GestureResponderEvent) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onLongPress(e);
          }
        : undefined;

    return (
        <AnimatedPressable
            {...rest}
            disabled={disabled}
            className={className}
            style={[style, animatedStyle, disabled ? { opacity: 0.45 } : null]}
            onPressIn={(e) => {
                scale.value = withSpring(pressScale, pressSpring);
                onPressIn?.(e);
            }}
            onPressOut={(e) => {
                scale.value = withSpring(1, pressSpring);
                onPressOut?.(e);
            }}
            onPress={onPress ? handlePress : undefined}
            onLongPress={handleLongPress}
        >
            {children}
        </AnimatedPressable>
    );
};

export default ScalePressable;
