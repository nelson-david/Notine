import { ReactNode } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../ui/IconButton";
import ChevronLeftIcon from "../../assets/icons/ChevronLeftIcon";
import { Nav } from "../../utils/types";

/**
 * Back button · centered title (+ subtitle) · optional right element.
 * Both sides are the same width so the title is always truly centered.
 */
const NavigationHeaderBar = ({
    title,
    subtitle,
    backAction,
    onBack,
    right,
}: {
    title?: string;
    subtitle?: string;
    /** Route name to navigate to instead of going back. */
    backAction?: string;
    /** Custom handler for the back button (takes precedence). */
    onBack?: () => void;
    right?: ReactNode;
}) => {
    const { navigate, goBack } = useNavigation<Nav>();

    const handleBack = () => {
        if (onBack) onBack();
        else if (backAction) navigate(backAction);
        else goBack();
    };

    return (
        <View className="w-full max-w-[960px] flex-row items-center self-center px-5 pb-2 pt-2">
            <View className="w-12 items-start">
                <IconButton label="Go back" onPress={handleBack}>
                    <ChevronLeftIcon size={{ width: "24", height: "24" }} />
                </IconButton>
            </View>

            <View className="flex-1 items-center">
                {title ? (
                    <Text
                        numberOfLines={1}
                        className="text-[17px] font-semibold text-ink"
                    >
                        {title}
                    </Text>
                ) : null}
                {subtitle ? (
                    <Text
                        numberOfLines={1}
                        className="mt-0.5 text-[12px] text-ink-muted"
                    >
                        {subtitle}
                    </Text>
                ) : null}
            </View>

            <View className="w-12 items-end">{right}</View>
        </View>
    );
};

export default NavigationHeaderBar;
