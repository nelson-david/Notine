import { View } from "react-native";
import Button from "./Button";

/** Cancel + confirm button row used at the bottom of every sheet. */
const SheetActions = ({
    onCancel,
    onConfirm,
    confirmLabel,
    loading,
    danger = false,
    disabled = false,
}: {
    onCancel: () => void;
    onConfirm: () => void;
    confirmLabel: string;
    loading?: boolean;
    danger?: boolean;
    disabled?: boolean;
}) => (
    <View className="flex-row gap-3 pt-6">
        <Button
            label="Cancel"
            variant="secondary"
            onPress={onCancel}
            className="flex-1"
        />
        <Button
            label={confirmLabel}
            variant={danger ? "danger" : "primary"}
            onPress={onConfirm}
            loading={loading}
            disabled={disabled}
            className="flex-1"
        />
    </View>
);

export default SheetActions;
