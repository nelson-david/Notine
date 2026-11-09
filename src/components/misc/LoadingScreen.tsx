import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../../theme/useTheme";

/** Shown while fonts and saved data are loading. */
const LoadingScreen = ({ showTitle = true }: { showTitle?: boolean }) => {
    const { colors } = useTheme();
    return (
        <View className="flex-1 items-center justify-center gap-5 bg-canvas">
            {showTitle ? (
                <Text className="font-brand text-[30px] uppercase text-ink">
                    Notine
                </Text>
            ) : null}
            <ActivityIndicator color={colors.accent} />
        </View>
    );
};

export default LoadingScreen;
