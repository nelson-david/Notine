import { useState } from "react";
import { View } from "react-native";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import AppSheet from "../ui/AppSheet";
import SheetInput from "../ui/SheetInput";
import ColorPicker from "../ui/ColorPicker";
import SheetActions from "../ui/SheetActions";
import { colorList } from "../../data/colorList";
import { generateRandomId } from "../../helpers/generateRandomId";
import { createNewFolder } from "../../helpers/dbFunctions";
import { deviceAtom, foldersAtom } from "../../utils/jotaiAtom";
import { Nav } from "../../utils/types";

const defaultColor = colorList[0].colorCode;

const CreateFolderSheet = ({ folderSheetRef }: { folderSheetRef: any }) => {
    const { navigate } = useNavigation<Nav>();
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [device] = useAtom<any>(deviceAtom);
    const [, setFolders] = useAtom(foldersAtom);
    const [folderName, setFolderName] = useState("");
    const [selectedColor, setSelectedColor] = useState(defaultColor);

    const reset = () => {
        setFolderName("");
        setSelectedColor(defaultColor);
    };

    const proceedToCreation = () => {
        setCreatingFolder(true);
        createNewFolder(
            {
                folderID: generateRandomId(8),
                name: folderName.trim() || "Untitled folder",
                color: selectedColor,
                deviceID: device.osBuildId,
                locked: false,
                pin: "",
            },
            setFolders,
            () => {
                setCreatingFolder(false);
                folderSheetRef.current?.close();
                reset();
                navigate("Folder");
            }
        );
    };

    return (
        <AppSheet ref={folderSheetRef} title="New folder">
            <SheetInput
                placeholder="Folder name"
                value={folderName}
                onChangeText={setFolderName}
            />
            <View className="pt-6">
                <ColorPicker value={selectedColor} onChange={setSelectedColor} />
            </View>
            <SheetActions
                onCancel={() => folderSheetRef.current?.close()}
                onConfirm={proceedToCreation}
                confirmLabel="Create"
                loading={creatingFolder}
            />
        </AppSheet>
    );
};

export default CreateFolderSheet;
