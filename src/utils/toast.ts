import Toast from "react-native-toast-message";

/** Shows a toast; styling comes from the themed config in ThemedToast. */
export const toastNotification = (
    type: string,
    text1: string,
    text2: string
) => {
    Toast.show({ type, text1, text2, visibilityTime: 2600 });
};
