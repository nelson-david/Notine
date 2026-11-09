import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import AppSheet from "../ui/AppSheet";
import SheetInput from "../ui/SheetInput";
import SheetActions from "../ui/SheetActions";
import { Nav } from "../../utils/types";
import { toastNotification } from "../../utils/toast";

const UnlockFolderSheet = ({
    unlockSheetRef,
    folder,
}: {
    unlockSheetRef: any;
    folder: any;
}) => {
    const { navigate } = useNavigation<Nav>();
    const [pin, setPin] = useState("");

    const proceedToUnlock = () => {
        setPin("");
        if (pin === folder.pin) {
            unlockSheetRef.current?.close();
            navigate("SingleFolder", { folder });
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            toastNotification(
                "error",
                "Pin error",
                "The pin you entered is incorrect"
            );
        }
    };

    return (
        <AppSheet
            ref={unlockSheetRef}
            title="Enter PIN"
            description={`“${folder.name}” is locked`}
            onDismiss={() => setPin("")}
        >
            {/* Older PINs were free text, so don't force a number pad here. */}
            <SheetInput
                pin
                keyboardType="default"
                placeholder="••••"
                value={pin}
                onChangeText={setPin}
                onSubmitEditing={proceedToUnlock}
            />
            <SheetActions
                onCancel={() => unlockSheetRef.current?.close()}
                onConfirm={proceedToUnlock}
                confirmLabel="Unlock"
                disabled={pin.length === 0}
            />
        </AppSheet>
    );
};

export default UnlockFolderSheet;
