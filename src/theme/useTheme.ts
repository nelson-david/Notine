import { useColorScheme } from "nativewind";
import { palette, Scheme } from "./palette";

/** Current color scheme (follows the device setting) and its palette. */
export const useTheme = () => {
    const { colorScheme } = useColorScheme();
    const scheme: Scheme = colorScheme === "dark" ? "dark" : "light";
    return { scheme, isDark: scheme === "dark", colors: palette[scheme] };
};
