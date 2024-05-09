import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

const createFolder = async (folderName: string, value: any) => {
    try {
        const value = await AsyncStorage.getItem("folders");
        if (value !== null) {
            // value previously stored
        }

        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("folder", jsonValue);
    } catch (e) {
        console.log("Saving error...");
    }
};

const createNote = async (folderName: string) => {
    try {
    } catch (e) {}
};

export { createFolder };
