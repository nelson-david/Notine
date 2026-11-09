import { useState } from "react";
import { useAtom } from "jotai";
import AppSheet from "../ui/AppSheet";
import SheetInput from "../ui/SheetInput";
import SheetActions from "../ui/SheetActions";
import { lockFolder } from "../../helpers/dbFunctions";
import { foldersAtom } from "../../utils/jotaiAtom";

const LockFolderSheet = ({
    lockSheetRef,
    folder,
}: {
    lockSheetRef: any;
    folder: any;
}) => {
    const [lockingFolder, setLockingFolder] = useState(false);
    const [, setFolders] = useAtom(foldersAtom);
    const [pin, setPin] = useState("");

    const proceedToLock = () => {
        setLockingFolder(true);
        lockFolder({ folderID: folder.folderID, pin }, setFolders, () => {
            setLockingFolder(false);
            setPin("");
            lockSheetRef.current?.close();
        });
    };

    return (
        <AppSheet
            ref={lockSheetRef}
            title="Lock folder"
            description={`Choose a 4-digit PIN for “${folder.name}”`}
            onDismiss={() => setPin("")}
        >
            <SheetInput pin placeholder="••••" value={pin} onChangeText={setPin} />
            <SheetActions
                onCancel={() => lockSheetRef.current?.close()}
                onConfirm={proceedToLock}
                confirmLabel="Lock"
                loading={lockingFolder}
                disabled={pin.length !== 4}
            />
        </AppSheet>
    );
};

export default LockFolderSheet;
