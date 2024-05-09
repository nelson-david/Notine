import RBSheet from "react-native-raw-bottom-sheet";
import { accentColor, globalSheetStyle, whiteColor } from "../../styles/const";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { colorList } from "../../data/colorList";
import { generateRandomId } from "../../helpers/generateRandomId";
import {
    createNewFolder,
    editFolder,
    lockFolder,
} from "../../helpers/dbFunctions";
import { useAtom } from "jotai";
import { foldersAtom } from "../../utils/jotaiAtom";

const LockFolderSheet = ({
    lockSheetRef,
    folder,
}: {
    lockSheetRef: any;
    folder: any;
}) => {
    const [lockingFolder, setLockingFolder] = useState(false);
    const [__, setFolders] = useAtom(foldersAtom);
    const [pin, setPin] = useState("");

    const onCompleteAction = () => {
        setLockingFolder(false);
        lockSheetRef.current.close();
    };

    const proceedToLock = () => {
        setLockingFolder(true);
        const folderDetails = {
            folderID: folder.folderID,
            pin,
        };
        lockFolder(folderDetails, setFolders, onCompleteAction);
    };

    return (
        <RBSheet
            ref={lockSheetRef}
            customStyles={styles.modalStyle}
            customModalProps={{
                animationType: "slide",
                statusBarTranslucent: true,
            }}
            useNativeDriver
            openDuration={150}
            closeDuration={150}
            height={hp(30)}
            draggable
        >
            <Text style={styles.title}>Lock Folder</Text>
            <View style={styles.contentDiv}>
                <View>
                    <TextInput
                        placeholder="Pin"
                        placeholderTextColor={accentColor}
                        value={pin}
                        onChangeText={(e) => setPin(e)}
                        style={styles.contentDiv.input}
                        maxLength={4}
                    />
                </View>
                <View style={styles.contentDiv.buttonDiv}>
                    <Pressable
                        onPress={() => lockSheetRef.current.close()}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        <Text style={styles.contentDiv.buttonDiv.button.text}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={proceedToLock}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        {lockingFolder ? (
                            <ActivityIndicator color={accentColor} />
                        ) : (
                            <Text
                                style={styles.contentDiv.buttonDiv.button.text}
                            >
                                Lock
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </RBSheet>
    );
};

const styles = StyleSheet.create({
    ...globalSheetStyle,
    contentDiv: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        input: {
            borderWidth: 1.3,
            borderColor: "rgba(255,255,255,0.5)",
            borderRadius: 15,
            height: 55,
            color: "rgba(255,255,255,1)",
            fontFamily: "SCPRegularFont",
            fontSize: 17,
            textAlign: "center",
            letterSpacing: 15,
        },
        buttonDiv: {
            flexDirection: "row",
            justifyContent: "center",
            gap: wp(20),
            paddingTop: 30,
            button: {
                backgroundColor: "rgba(0,0,0,0.1)",
                height: 40,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 50,
                text: {
                    color: whiteColor,
                    fontSize: 14,
                    fontFamily: "NothingFont",
                    letterSpacing: 0.7,
                },
            },
        },
    },
});

export default LockFolderSheet;
