import { useFonts } from "expo-font";
import { Platform, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { MenuProvider } from "react-native-popup-menu";
import AppNavigation from "./src/routes";
import { appColor } from "./src/styles/const";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;

const App = () => {
    const [loaded] = useFonts({
        SanFrancisco: require("./src/assets/fonts/san-francisco.ttf"),
        NothingFont: require("./src/assets/fonts/nothing-font.ttf"),
        SCPFont: require("./src/assets/fonts/scp.ttf"),
        SCPRegularFont: require("./src/assets/fonts/scp-regular.ttf"),
    });

    if (Platform.OS === "android") {
        NavigationBar.setBackgroundColorAsync(appColor);
    }

    if (!loaded) {
        return <Text style={{ fontSize: 30 }}>Loading...</Text>;
    }

    return (
        <BottomSheetModalProvider>
            <MenuProvider>
                <GestureHandlerRootView
                    style={{
                        flex: 1,
                    }}
                >
                    <StatusBar style="light" backgroundColor={appColor} />
                    <AppNavigation />
                    <Toast topOffset={53} />
                </GestureHandlerRootView>
            </MenuProvider>
        </BottomSheetModalProvider>
    );
};

export default App;
