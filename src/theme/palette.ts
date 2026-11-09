import { vars } from "nativewind";

/**
 * The single source of truth for Notine's colors, in light and dark.
 *
 * - Tailwind classes (`bg-surface`, `text-ink-muted`, …) read these through
 *   CSS variables (see tailwind.config.js), so they switch automatically.
 * - JS code that needs a raw color (SVG icons, the rich text editor, the
 *   navigation theme) uses `useTheme().colors`.
 */
export const palette = {
    light: {
        canvas: "#F5F5F3",
        surface: "#FFFFFF",
        surface2: "#EEEEEB",
        line: "#E6E6E2",
        ink: "#141414",
        inkMuted: "#6B6B67",
        inkSubtle: "#A6A6A1",
        accent: "#C4332F",
        onAccent: "#FFFFFF",
    },
    dark: {
        canvas: "#0B0B0B",
        surface: "#161616",
        surface2: "#222222",
        line: "#262626",
        ink: "#F3F3F1",
        inkMuted: "#8F8F8B",
        inkSubtle: "#5C5C59",
        accent: "#E5483F",
        onAccent: "#FFFFFF",
    },
};

export type Scheme = keyof typeof palette;
export type Palette = (typeof palette)["light"];

const toRgb = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

const toVars = (p: Palette) =>
    vars({
        "--canvas": toRgb(p.canvas),
        "--surface": toRgb(p.surface),
        "--surface-2": toRgb(p.surface2),
        "--line": toRgb(p.line),
        "--ink": toRgb(p.ink),
        "--ink-muted": toRgb(p.inkMuted),
        "--ink-subtle": toRgb(p.inkSubtle),
        "--accent": toRgb(p.accent),
        "--on-accent": toRgb(p.onAccent),
    });

export const themeVars: Record<Scheme, ReturnType<typeof vars>> = {
    light: toVars(palette.light),
    dark: toVars(palette.dark),
};

/** Fixed colors that don't change with the theme. */
export const brand = {
    accent: "#C4332F",
    white: "#FFFFFF",
    black: "#000000",
};
