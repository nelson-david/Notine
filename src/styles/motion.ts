import {
    FadeIn,
    FadeInDown,
    FadeOut,
    LinearTransition,
    WithSpringConfig,
    ZoomIn,
} from "react-native-reanimated";

// One place for the app's motion language so everything feels consistent.
// Springs are tuned to settle quickly with almost no wobble ("buttery").

/** Press feedback: quick, firm, no visible overshoot. */
export const pressSpring: WithSpringConfig = {
    damping: 20,
    stiffness: 420,
    mass: 0.5,
};

/** Bottom sheets: smooth glide with a whisper of bounce. */
export const sheetSpring = {
    damping: 26,
    stiffness: 260,
    mass: 0.9,
    overshootClamping: false,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
};

/** Staggered entrance for grid/list items (capped so long lists stay fast). */
export const enterItem = (index = 0) =>
    FadeInDown.delay(Math.min(index, 6) * 40)
        .springify()
        .damping(22)
        .stiffness(200)
        .mass(0.8);

/** Entrance for whole sections of a screen. */
export const enterSection = (delay = 0) =>
    FadeInDown.delay(delay).springify().damping(24).stiffness(180);

export const popIn = ZoomIn.springify().damping(16).stiffness(260);
export const fadeIn = FadeIn.duration(200);
export const fadeOut = FadeOut.duration(150);
export const exitItem = FadeOut.duration(160);

/** Siblings glide into place when an item is added/removed. */
export const layoutSpring = LinearTransition.springify()
    .damping(24)
    .stiffness(220);
