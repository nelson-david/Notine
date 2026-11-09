import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import Screen from "../ui/Screen";
import NavigationHeaderBar from "../header/NavigationHeader";
import { useTheme } from "../../theme/useTheme";
import { enterSection } from "../../styles/motion";

const SYSTEM_FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/**
 * Shared editor used by the New Note and Single Note screens.
 *
 * `onSave(title, content)` runs whenever the screen is left — back button,
 * swipe, or Android hardware back — so edits are never lost.
 */
const NoteEditor = ({
    initialTitle = "",
    initialContent = "",
    subtitle,
    headerRight,
    onSave,
}: {
    initialTitle?: string;
    initialContent?: string;
    subtitle?: string;
    headerRight?: ReactNode;
    onSave: (title: string, content: string) => void;
}) => {
    const navigation = useNavigation();
    const { colors, scheme } = useTheme();
    const editorRef = useRef<RichEditor>(null);
    const [title, setTitle] = useState(initialTitle);
    const titleRef = useRef(initialTitle);
    const contentRef = useRef(initialContent);
    const onSaveRef = useRef(onSave);
    onSaveRef.current = onSave;

    useEffect(
        () =>
            navigation.addListener("beforeRemove", () => {
                onSaveRef.current(titleRef.current, contentRef.current);
            }),
        [navigation]
    );

    // New object only when the theme changes; the editor re-applies it live.
    const editorStyle = useMemo(
        () => ({
            backgroundColor: colors.canvas,
            color: colors.ink,
            placeholderColor: colors.inkSubtle,
            caretColor: colors.accent,
            contentCSSText: `font-family: ${SYSTEM_FONT}; font-size: 17px; line-height: 1.6; padding: 0;`,
        }),
        [scheme]
    );

    return (
        <Screen edges={["top", "bottom"]}>
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <NavigationHeaderBar subtitle={subtitle} right={headerRight} />

                <ScrollView
                    className="flex-1"
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="w-full max-w-[720px] self-center px-5">
                        <Animated.View entering={enterSection(30)}>
                            <TextInput
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text);
                                    titleRef.current = text;
                                }}
                                placeholder="Title"
                                placeholderTextColor={colors.inkSubtle}
                                selectionColor={colors.accent}
                                multiline
                                scrollEnabled={false}
                                className="pb-1 pt-4 text-[28px] font-bold leading-[34px] text-ink"
                            />
                        </Animated.View>

                        <Animated.View
                            entering={enterSection(80)}
                            className="mb-8 mt-2 -mx-1"
                        >
                            <RichEditor
                                ref={editorRef}
                                placeholder="Start writing…"
                                initialContentHTML={initialContent}
                                useContainer
                                containerStyle={{ minHeight: 360 }}
                                editorStyle={editorStyle}
                                onChange={(html) => {
                                    contentRef.current = html;
                                }}
                            />
                        </Animated.View>
                    </View>
                </ScrollView>

                <View className="w-full max-w-[720px] self-center px-5 pb-2 pt-1">
                    <View className="overflow-hidden rounded-2xl border border-line bg-surface">
                        <RichToolbar
                            editor={editorRef}
                            actions={[
                                actions.setBold,
                                actions.setItalic,
                                actions.setUnderline,
                                actions.insertBulletsList,
                                actions.insertOrderedList,
                                actions.checkboxList,
                                actions.insertLink,
                                actions.keyboard,
                            ]}
                            iconTint={colors.inkMuted}
                            selectedIconTint={colors.accent}
                            disabledIconTint={colors.inkSubtle}
                            style={{
                                backgroundColor: "transparent",
                                height: 50,
                            }}
                            flatContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "space-between",
                                paddingHorizontal: 6,
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Screen>
    );
};

export default NoteEditor;
