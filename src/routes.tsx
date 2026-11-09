import { useEffect, useMemo, useState } from "react";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from "@react-navigation/stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import HomeScreen from "./screens/app/Home";
import SingleNoteScreen from "./screens/app/SingleNote";
import FoldersScreen from "./screens/app/Folders";
import SingleFolderScreen from "./screens/app/SingleFolder";
import NewNoteScreen from "./screens/app/NewNote";
import RecycleBinScreen from "./screens/app/RecycleBin";
import LoadingScreen from "./components/misc/LoadingScreen";
import { fetchAndSetInfo } from "./helpers/dbFunctions";
import { deviceAtom, foldersAtom, notesAtom } from "./utils/jotaiAtom";
import { useTheme } from "./theme/useTheme";

const Stack = createStackNavigator();

const AppNavigation = () => {
    const [loading, setLoading] = useState(true);
    const [, setDevice] = useAtom(deviceAtom);
    const [, setFolders] = useAtom(foldersAtom);
    const [, setNotes] = useAtom(notesAtom);
    const { colors, isDark } = useTheme();

    useEffect(() => {
        fetchAndSetInfo(setDevice, setFolders, setNotes, () =>
            setLoading(false)
        );
    }, []);

    // Navigation colors follow the theme so transitions never flash.
    const navTheme = useMemo(() => {
        const base = isDark ? DarkTheme : DefaultTheme;
        return {
            ...base,
            colors: {
                ...base.colors,
                background: colors.canvas,
                card: colors.canvas,
                text: colors.ink,
                border: colors.line,
                primary: colors.accent,
            },
        };
    }, [isDark]);

    const screenOptions = useMemo<StackNavigationOptions>(
        () => ({
            headerShown: false,
            // Swipe back is safe: the note editor saves on any kind of exit.
            gestureEnabled: true,
            cardStyle: { backgroundColor: colors.canvas },
            ...TransitionPresets.SlideFromRightIOS,
        }),
        [isDark]
    );

    if (loading) return <LoadingScreen />;

    return (
        <NavigationContainer theme={navTheme}>
            {/* Inside the navigator so sheet contents can navigate. */}
            <BottomSheetModalProvider>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={screenOptions}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="SingleNote" component={SingleNoteScreen} />
                    <Stack.Screen name="Folder" component={FoldersScreen} />
                    <Stack.Screen
                        name="SingleFolder"
                        component={SingleFolderScreen}
                    />
                    <Stack.Screen name="NewNote" component={NewNoteScreen} />
                    <Stack.Screen name="RecycleBin" component={RecycleBinScreen} />
                </Stack.Navigator>
            </BottomSheetModalProvider>
        </NavigationContainer>
    );
};

export default AppNavigation;
