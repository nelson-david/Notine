import { useMemo } from "react";
import { Image, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../ui/IconButton";
import TrashIcon from "../../assets/icons/TrashIcon";
import { avatarList } from "../../data/avatarList";
import { notesAtom } from "../../utils/jotaiAtom";
import { Nav } from "../../utils/types";
import { popIn } from "../../styles/motion";

const formatToday = () =>
    new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

const HomeHeader = () => {
    const { navigate } = useNavigation<Nav>();
    const [notes] = useAtom<any[]>(notesAtom as any);
    const binCount = notes.filter((note: any) => note.recycleBin).length;
    // Keep the avatar stable across re-renders (e.g. when notes change).
    const avatar = useMemo(
        () => avatarList[Math.floor(Math.random() * avatarList.length)],
        []
    );

    return (
        <View className="flex-row items-center justify-between pb-2 pt-4">
            <View className="flex-1 pr-3">
                <Text
                    numberOfLines={1}
                    className="text-[13px] font-medium text-ink-muted"
                >
                    {formatToday()}
                </Text>
                <Text className="mt-1 font-brand text-[28px] uppercase leading-[34px] text-ink">
                    Notine
                </Text>
            </View>

            <View className="flex-row items-center gap-2.5">
                <View>
                    <IconButton
                        label={`Recycle bin, ${binCount} notes`}
                        onPress={() => navigate("RecycleBin")}
                    >
                        <TrashIcon size={{ width: "19", height: "19" }} />
                    </IconButton>
                    {binCount > 0 ? (
                        // Re-keyed on count so the badge pops when it changes.
                        <Animated.View
                            key={binCount}
                            entering={popIn}
                            pointerEvents="none"
                            className="absolute -right-1 -top-1 h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-canvas bg-accent px-1"
                        >
                            <Text className="text-[10px] font-bold text-accent-fg">
                                {binCount > 99 ? "99+" : binCount}
                            </Text>
                        </Animated.View>
                    ) : null}
                </View>
                <Image
                    source={avatar}
                    className="h-10 w-10 rounded-full border border-line"
                />
            </View>
        </View>
    );
};

export default HomeHeader;
