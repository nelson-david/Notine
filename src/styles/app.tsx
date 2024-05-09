import { Platform } from "react-native";
import { appColor, cardColor, globalSidePadding } from "./const";

const homeScreenStyle: any = {
    homeScreen: {
        paddingTop: Platform.OS === "android" ? 5 : 0,
        width: "100%",
        height: "100%",
        backgroundColor: appColor,
        flex: 1,
        alignItems: "center",
    },
};

const singleNoteStyle: any = {
    noteScreen: {
        paddingLeft: globalSidePadding,
        paddingRight: globalSidePadding,
        paddingTop: Platform.OS === "android" ? 5 : 0,
        width: "100%",
        height: "100%",
        backgroundColor: appColor,
        flex: 1,
        alignItems: "center",
        contentView: {
            marginTop: 15,
            height: 750,
            backgroundColor: cardColor,
            borderRadius: 25,
            padding: 15,
        },
        contentTextView: {
            titleInput: {
                height: 60,
                fontSize: 28,
                fontFamily: "NothingFont",
                letterSpacing: 0.7,
                color: "rgba(255,255,255,0.85)",
                borderRadius: 20,
                padding: 15,
                backgroundColor: "rgba(0,0,0,0.1)",
                marginBottom: 10,
            },
        },
    },
};

const myFoldersStyle: any = {
    foldersScreen: {
        paddingTop: Platform.OS === "android" ? 5 : 0,
        width: "100%",
        height: "100%",
        backgroundColor: appColor,
        flex: 1,
        alignItems: "center",
        screenContent: {
            width: "100%",
            height: "100%",
            paddingLeft: globalSidePadding,
            paddingRight: globalSidePadding,
        },
        folderList: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 25,
            paddingTop: 25,
            paddingBottom: 25,
            paddingLeft: 8,
            paddingRight: 8,
        },
    },
};

export { homeScreenStyle, singleNoteStyle, myFoldersStyle };
