import { StyleSheet, Text, View } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { appColor, cardColor, whiteColor } from "../../styles/const";
import EllipsisIcon from "../../assets/icons/EllipsisIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import StarIcon from "../../assets/icons/StarIcon";
import LockIcon from "../../assets/icons/LockIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import EditIcon from "../../assets/icons/EditIcon";
import ConfirmDeleteSheet from "../bottomsheet/ConfirmDeleteSheet";
import { useRef, useState } from "react";
import { deleteFolder } from "../../helpers/dbFunctions";
import { useAtom } from "jotai";
import { foldersAtom } from "../../utils/jotaiAtom";
import EditFolderSheet from "../bottomsheet/EditFolderSheet";
import LockFolderSheet from "../bottomsheet/LockFolderSheet";

const FolderCardMenu = ({ folder }: { folder: any }) => {
    const [_, setFolders] = useAtom(foldersAtom);
    const deleteSheetRef = useRef<any>();
    const editSheetRef = useRef<any>();
    const lockSheetRef = useRef<any>();
    const [deletingFolder, setDeletingFolder] = useState(false);

    const deleteAction = () => {
        setDeletingFolder(true);
        deleteFolder(folder.folderID, setFolders, () => {
            setDeletingFolder(false);
            deleteSheetRef.current.close();
        });
    };

    return (
        <>
            <Menu style={styles.menu}>
                <MenuTrigger
                    children={
                        <EllipsisIcon size={{ width: "23", height: "23" }} />
                    }
                />
                <MenuOptions
                    optionsContainerStyle={{
                        backgroundColor: cardColor,
                        borderRadius: 25,
                        padding: 12,
                        paddingTop: 13,
                        width: 165,
                        borderWidth: 1.5,
                        borderColor: "rgba(255,255,255,0.05)",
                    }}
                >
                    <View style={styles.flexView}>
                        <MenuOption
                            onSelect={() => lockSheetRef.current.open()}
                            style={styles.flexView.menuOption}
                        >
                            <LockIcon
                                color="rgba(255,255,255,0.8)"
                                size={{ height: "20", width: "20" }}
                            />
                        </MenuOption>
                        <MenuOption
                            onSelect={() => editSheetRef.current.open()}
                            style={styles.flexView.menuOption}
                        >
                            <EditIcon
                                color="rgba(255,255,255,0.8)"
                                size={{ height: "20", width: "20" }}
                            />
                        </MenuOption>
                        <MenuOption
                            onSelect={() => deleteSheetRef.current.open()}
                            style={styles.flexView.menuOption}
                        >
                            <TrashIcon
                                color="rgba(255,255,255,0.8)"
                                size={{ height: "20", width: "20" }}
                            />
                        </MenuOption>
                    </View>
                </MenuOptions>
            </Menu>
            <EditFolderSheet editSheetRef={editSheetRef} folder={folder} />
            <LockFolderSheet lockSheetRef={lockSheetRef} folder={folder} />
            <ConfirmDeleteSheet
                deleteSheetRef={deleteSheetRef}
                actionToTake={deleteAction}
                processing={deletingFolder}
                question=" Move 1 folder and all the items in it to the Recycle bin?"
            />
        </>
    );
};

const styles = StyleSheet.create({
    menu: {},
    menuOption: {
        padding: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 20,
        text: {
            fontFamily: "NothingFont",
            color: whiteColor,
            letterSpacing: 0.7,
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 14,
        },
    },
    flexView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 5,
        marginRight: 5,
        padding: 0,
        paddingTop: 5,
        paddingBottom: 5,
        menuOption: {
            padding: wp(2.5),
        },
    },
} as any);

export default FolderCardMenu;
