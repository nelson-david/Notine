import { ReactNode } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { MAX_CONTENT_WIDTH, PAGE_PADDING } from "./Container";
import { enterItem, exitItem, layoutSpring } from "../../styles/motion";

const GAP = 12;

/** Column count for the current width: phones 2, small tablets 3, large 4. */
export const useColumns = (phone = 2) => {
    const { width } = useWindowDimensions();
    if (width >= 900) return phone + 2;
    if (width >= 600) return phone + 1;
    return phone;
};

/**
 * Responsive grid with exact, pixel-aligned column widths.
 * Items animate in with a stagger and glide when the list changes.
 */
function Grid<T>({
    data,
    keyExtractor,
    renderItem,
    columns,
    footer,
}: {
    data: T[];
    keyExtractor: (item: T) => string;
    renderItem: (item: T, index: number) => ReactNode;
    /** Phone column count (scaled up automatically on tablets). */
    columns?: number;
    /** Extra cell rendered after the items (e.g. a "New" tile). */
    footer?: ReactNode;
}) {
    const { width } = useWindowDimensions();
    const cols = useColumns(columns ?? 2);
    const inner = Math.min(width, MAX_CONTENT_WIDTH) - PAGE_PADDING * 2;
    const itemWidth = Math.floor((inner - GAP * (cols - 1)) / cols);

    return (
        <View className="flex-row flex-wrap" style={{ gap: GAP }}>
            {data.map((item, index) => (
                <Animated.View
                    key={keyExtractor(item)}
                    entering={enterItem(index)}
                    exiting={exitItem}
                    layout={layoutSpring}
                    style={{ width: itemWidth }}
                >
                    {renderItem(item, index)}
                </Animated.View>
            ))}
            {footer ? (
                <Animated.View
                    entering={enterItem(data.length)}
                    layout={layoutSpring}
                    style={{ width: itemWidth }}
                >
                    {footer}
                </Animated.View>
            ) : null}
        </View>
    );
}

export default Grid;
