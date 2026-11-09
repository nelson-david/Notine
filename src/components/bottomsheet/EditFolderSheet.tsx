import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAtom } from "jotai";
import AppSheet from "../ui/AppSheet";
import SheetInput from "../ui/SheetInput";
import ColorPicker from "../ui/ColorPicker";
import SheetActions from "../ui/SheetActions";
import { editFolder } from "../../helpers/dbFunctions";
import { deviceAtom, foldersAtom } from "../../utils/jotaiAtom";

const EditFolderSheet = ({
    editSheetRef,
    folder,
}: {
    editSheetRef: any;
    folder: any;
}) => {
    const [saving, setSaving] = useState(false);
    const [device] = useAtom<any>(deviceAtom);
    const [, setFolders] = useAtom(foldersAtom);
    const [folderName, setFolderName] = useState(folder.name);
    const [selectedColor, setSelectedColor] = useState<string>(folder.color);

    // Keep the form in sync if the folder changes elsewhere.
    useEffect(() => {
        setFolderName(folder.name);
        setSelectedColor(folder.color);
    }, [folder.name, folder.color]);

    const proceedToEditing = () => {
        setSaving(true);
        editFolder(
            {
                folderID: folder.folderID,
                name: folderName.trim() || folder.name,
                color: selectedColor,
                deviceID: device.osBuildId,
            },
            setFolders,
            () => {
                setSaving(false);
                editSheetRef.current?.close();
            }
        );
    };

    return (
        <AppSheet ref={editSheetRef} title="Edit folder">
            <SheetInput
                placeholder="Folder name"
                value={folderName}
                onChangeText={setFolderName}
            />
            <View className="pt-6">
                <ColorPicker value={selectedColor} onChange={setSelectedColor} />
            </View>
            <SheetActions
                onCancel={() => editSheetRef.current?.close()}
                onConfirm={proceedToEditing}
                confirmLabel="Save"
                loading={saving}
            />
        </AppSheet>
    );
};

export default EditFolderSheet;
