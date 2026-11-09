import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { colorList } from "../../data/colorList";
import { pressSpring } from "../../styles/motion";
import ScalePressable from "./ScalePressable";

const Swatch = ({
    color,
    selected,
    onPress,
}: {
    color: string;
    selected: boolean;
    onPress: () => void;
}) => {
    // The ring eases in around the selected swatch.
    const ringStyle = useAnimatedStyle(() => ({
        opacity: withSpring(selected ? 1 : 0, pressSpring),
        transform: [{ scale: withSpring(selected ? 1 : 0.8, pressSpring) }],
    }));

    return (
        <View className="w-1/6 items-center py-1.5">
            <ScalePressable
                haptic
                pressScale={0.88}
                onPress={onPress}
                accessibilityLabel={`Color ${color}`}
                accessibilityState={{ selected }}
                className="h-10 w-10 items-center justify-center"
            >
                <Animated.View
                    className="absolute inset-0 rounded-full border-2"
                    style={[{ borderColor: color }, ringStyle]}
                />
                <View
                    className="h-7 w-7 rounded-full"
                    style={{ backgroundColor: color }}
                />
            </ScalePressable>
        </View>
    );
};

const ColorPicker = ({
    value,
    onChange,
}: {
    value?: string;
    onChange: (color: string) => void;
}) => (
    <View>
        <Text className="mb-2 text-[13px] font-medium text-ink-muted">Color</Text>
        <View className="-mx-1 flex-row flex-wrap">
            {colorList.map((color) => (
                <Swatch
                    key={color.colorCode}
                    color={color.colorCode}
                    selected={value === color.colorCode}
                    onPress={() => onChange(color.colorCode)}
                />
            ))}
        </View>
    </View>
);

export default ColorPicker;
