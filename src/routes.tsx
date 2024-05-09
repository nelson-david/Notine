import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import HomeScreen from "./screens/app/Home";
import SingleNoteScreen from "./screens/app/SingleNote";
import { fetchAndSetInfo } from "./helpers/dbFunctions";
import { useAtom } from "jotai";
import { deviceAtom, foldersAtom, notesAtom } from "./utils/jotaiAtom";
import { useEffect, useState } from "react";
import FoldersScreen from "./screens/app/Folders";
import SingleFolderScreen from "./screens/app/SingleFolder";
import { Text } from "react-native";
import NewNoteScreen from "./screens/app/NewNote";

const Stack = createStackNavigator();
const TransitionScreenOptions = {
    headerShown: false,
    gestureEnabled: false,
    ...TransitionPresets.SlideFromRightIOS,
};

const AppNavigation = () => {
    const [loading, setLoading] = useState(true);
    const [_, setDevice] = useAtom(deviceAtom);
    const [__, setFolders] = useAtom(foldersAtom);
    const [___, setNotes] = useAtom(notesAtom);

    const runOnFinish = () => {
        setLoading(false);
    };

    useEffect(() => {
        fetchAndSetInfo(setDevice, setFolders, setNotes, runOnFinish);
    }, []);

    return (
        <>
            {loading ? (
                <Text style={{ fontSize: 30 }}>Loadi...ng...</Text>
            ) : (
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={TransitionScreenOptions}
                    >
                        {/* App Screens */}
                        <Stack.Group>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen
                                name="SingleNote"
                                component={SingleNoteScreen}
                            />
                            <Stack.Screen
                                name="Folder"
                                component={FoldersScreen}
                            />
                            <Stack.Screen
                                name="SingleFolder"
                                component={SingleFolderScreen}
                            />
                            <Stack.Screen
                                name="NewNote"
                                component={NewNoteScreen}
                            />
                        </Stack.Group>
                        {/* End of App Screens */}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
};

export default AppNavigation;
