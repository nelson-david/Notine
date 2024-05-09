import Toast from "react-native-toast-message";

export const toastNotification = (
    type: string,
    text1: string,
    text2: string
) => {
    Toast.show({
        type,
        text1,
        text2,
        text1Style: {
            fontSize: 18,
            fontFamily: "NothingFont",
            letterSpacing: -0.5,
            color: "#000000",
        },
        text2Style: {
            fontFamily: "SCPFont",
            fontSize: 14,
            letterSpacing: -0.3,
            color: "rgba(0,0,0,0.85)",
        },
    });
};
