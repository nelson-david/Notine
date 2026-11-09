import { View } from "react-native";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { useTheme } from "../../theme/useTheme";

const SUCCESS = "#22A55B";

/** Toast host whose colors follow the light/dark theme. */
const ThemedToast = () => {
    const { colors } = useTheme();

    const make =
        (dot: string): ToastConfig[string] =>
        (props) =>
            (
                <BaseToast
                    {...props}
                    style={{
                        borderLeftWidth: 1,
                        borderLeftColor: colors.line,
                        borderRadius: 18,
                        backgroundColor: colors.surface,
                        borderColor: colors.line,
                        borderWidth: 1,
                        height: 64,
                        width: "90%",
                        maxWidth: 480,
                        alignItems: "center",
                        paddingLeft: 16,
                    }}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    text1Style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: colors.ink,
                    }}
                    text2Style={{ fontSize: 13, color: colors.inkMuted }}
                    text1NumberOfLines={1}
                    text2NumberOfLines={1}
                    renderLeadingIcon={() => (
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: dot,
                            }}
                        />
                    )}
                />
            );

    const config: ToastConfig = {
        success: make(SUCCESS),
        error: make(colors.accent),
        info: make(colors.inkMuted),
    };

    return <Toast config={config} topOffset={56} />;
};

export default ThemedToast;
