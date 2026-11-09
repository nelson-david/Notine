import { ReactNode } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { themeVars } from "./palette";
import { useTheme } from "./useTheme";

/**
 * Provides the theme's CSS variables to everything below it (including
 * bottom sheets, which portal into a host inside this tree).
 */
const ThemeRoot = ({ children }: { children: ReactNode }) => {
    const { scheme, isDark } = useTheme();
    return (
        <View style={themeVars[scheme]} className="flex-1 bg-canvas">
            <StatusBar style={isDark ? "light" : "dark"} />
            {children}
        </View>
    );
};

export default ThemeRoot;
