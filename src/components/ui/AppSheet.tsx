import {
    ReactNode,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import { Text, View, useWindowDimensions } from "react-native";
import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    BottomSheetView,
    useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme/useTheme";
import { themeVars } from "../../theme/palette";
import { sheetSpring } from "../../styles/motion";

export type AppSheetRef = { open: () => void; close: () => void };

const MAX_SHEET_WIDTH = 520;

/**
 * The one bottom sheet used across the app: a floating card that glides
 * up, sizes itself to its content, closes on backdrop tap or swipe-down,
 * stays above the keyboard, and centers itself on wide screens.
 *
 * Exposes `open()` / `close()` on its ref.
 */
const AppSheet = forwardRef<
    AppSheetRef,
    {
        title?: string;
        description?: string;
        children: ReactNode;
        onDismiss?: () => void;
    }
>(({ title, description, children, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const { colors, isDark, scheme } = useTheme();

    useImperativeHandle(ref, () => ({
        open: () => modalRef.current?.present(),
        close: () => modalRef.current?.dismiss(),
    }));

    const animationConfigs = useBottomSheetSpringConfigs(sheetSpring);

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={isDark ? 0.6 : 0.35}
                pressBehavior="close"
            />
        ),
        [isDark]
    );

    const sideMargin = Math.max(12, (width - MAX_SHEET_WIDTH) / 2);

    return (
        <BottomSheetModal
            ref={modalRef}
            enableDynamicSizing
            detached
            bottomInset={insets.bottom + 10}
            style={{ marginHorizontal: sideMargin }}
            backgroundStyle={{
                backgroundColor: colors.surface,
                borderRadius: 28,
                borderWidth: isDark ? 1 : 0,
                borderColor: colors.line,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.inkSubtle,
                width: 36,
                height: 4,
            }}
            animationConfigs={animationConfigs}
            backdropComponent={renderBackdrop}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            onDismiss={onDismiss}
        >
            {/* Re-apply theme variables: the sheet renders in a portal. */}
            <BottomSheetView style={themeVars[scheme]}>
                <View className="px-5 pb-5">
                    {title ? (
                        <View className="items-center pb-5 pt-1">
                            <Text
                                numberOfLines={1}
                                className="text-[17px] font-semibold text-ink"
                            >
                                {title}
                            </Text>
                            {description ? (
                                <Text className="mt-1.5 text-center text-[14px] leading-5 text-ink-muted">
                                    {description}
                                </Text>
                            ) : null}
                        </View>
                    ) : null}
                    {children}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

export default AppSheet;
