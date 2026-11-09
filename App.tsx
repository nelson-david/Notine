import "./global.css";
import "./src/lib/nativewindInterop";
import { useEffect } from "react";
import { Platform, Text } from "react-native";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import AppNavigation from "./src/routes";
import LoadingScreen from "./src/components/misc/LoadingScreen";
import ThemedToast from "./src/components/ui/ThemedToast";
import ThemeRoot from "./src/theme/ThemeRoot";
import { useTheme } from "./src/theme/useTheme";

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;

const App = () => {
    const { colors, isDark } = useTheme();
    const [loaded] = useFonts({
        NothingFont: require("./src/assets/fonts/nothing-font.ttf"),
    });

    // Match the Android system navigation bar to the theme.
    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setBackgroundColorAsync(colors.canvas);
            NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
        }
    }, [isDark]);

    return (
        <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: colors.canvas }}
        >
            <SafeAreaProvider>
                <ThemeRoot>
                    {loaded ? (
                        <AppNavigation />
                    ) : (
                        <LoadingScreen showTitle={false} />
                    )}
                    <ThemedToast />
                </ThemeRoot>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

export default App;
