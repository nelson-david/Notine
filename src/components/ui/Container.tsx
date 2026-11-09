import { ReactNode } from "react";
import { View } from "react-native";

/** Max content width so layouts stay readable on tablets. */
export const MAX_CONTENT_WIDTH = 960;
/** Horizontal page margin used by every screen (px-5). */
export const PAGE_PADDING = 20;

/** Centers content, applies the page margin and caps the width. */
const Container = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => (
    <View className={`w-full max-w-[960px] self-center px-5 ${className}`}>
        {children}
    </View>
);

export default Container;
