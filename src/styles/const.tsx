import { Platform } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const sheetBorderRadius = 25;
const sheetBackgroundColor = "#1F1E1E";
const sheetDraggableColor = "#B6B6B6";
const appColor = "#090909";
const cardColor = "#1b1b1b";
const accentColor = "#c4332f";
const whiteColor = "#ffffff";
const globalSidePadding = 15;

const globalScrollViewStyle: any = {
    width: "100%",
};

const globalSheetStyle: any = {
    modalStyle: {
        wrapper: {
            backgroundColor: "#00000077",
            padding: Platform.OS === "android" ? 15 : 0,
        },
        draggableIcon: {
            backgroundColor: sheetDraggableColor,
        },
        container: {
            backgroundColor: sheetBackgroundColor,
            borderRadius: sheetBorderRadius,
        },
    },
    title: {
        color: whiteColor,
        textAlign: "center",
        fontFamily: "NothingFont",
        letterSpacing: 0.5,
        fontSize: 17,
        padding: 15,
    },
};

const FontFamilyStylesheet = `
@font-face {
    font-family: "SCPFont";
    src: url("https://res.cloudinary.com/ruthless-labs/raw/upload/v1714485154/mobile-apps/qtd6sfom1seodpj14txl.ttf"); // You can also use a web url here
    font-weight: normal;
}`;
const fontFamily = "SCPFont";

export {
    globalScrollViewStyle,
    appColor,
    cardColor,
    accentColor,
    whiteColor,
    globalSidePadding,
    sheetBorderRadius,
    sheetBackgroundColor,
    sheetDraggableColor,
    globalSheetStyle,
    FontFamilyStylesheet,
    fontFamily,
};
