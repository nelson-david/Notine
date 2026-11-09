/** @type {import('tailwindcss').Config} */
// Theme colors are CSS variables set per color scheme in
// src/theme/palette.ts — edit colors there, not here.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
    content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                canvas: v("canvas"),
                surface: { DEFAULT: v("surface"), 2: v("surface-2") },
                line: v("line"),
                ink: {
                    DEFAULT: v("ink"),
                    muted: v("ink-muted"),
                    subtle: v("ink-subtle"),
                },
                accent: { DEFAULT: v("accent"), fg: v("on-accent") },
            },
            fontFamily: {
                // Brand wordmark only; everything else uses the system font.
                brand: ["NothingFont"],
            },
        },
    },
    plugins: [],
};
