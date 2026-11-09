import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInputProps } from "react-native";
import { useTheme } from "../../theme/useTheme";

/**
 * Text input for use inside an AppSheet (keeps the sheet above the
 * keyboard). `pin` renders a large, spaced, numeric PIN field.
 */
const SheetInput = ({
    pin = false,
    ...props
}: TextInputProps & { pin?: boolean }) => {
    const { colors } = useTheme();
    return (
        <BottomSheetTextInput
            placeholderTextColor={colors.inkSubtle}
            selectionColor={colors.accent}
            {...(pin
                ? {
                      keyboardType: "number-pad",
                      secureTextEntry: true,
                      maxLength: 4,
                      textAlign: "center",
                  }
                : {})}
            {...props}
            className={
                pin
                    ? "h-14 rounded-2xl border border-line bg-surface-2 text-[22px] tracking-[12px] text-ink"
                    : "h-12 rounded-2xl border border-line bg-surface-2 px-4 text-[16px] text-ink"
            }
        />
    );
};

export default SheetInput;
