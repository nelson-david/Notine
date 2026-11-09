import { useTheme } from "./useTheme";

/** An icon's color: the explicit one if given, else the theme's ink color. */
export const useIconColor = (color?: string) => {
    const { colors } = useTheme();
    return color ?? colors.ink;
};
