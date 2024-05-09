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
import { createNewFolder, editFolder } from "../../helpers/dbFunctions";
import { useAtom } from "jotai";
import { deviceAtom, foldersAtom } from "../../utils/jotaiAtom";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";

const EditFolderSheet = ({
    editSheetRef,
    folder,
}: {
    editSheetRef: any;
    folder: any;
}) => {
    const { navigate } = useNavigation<Nav>();
    const [creatingFolder, setCreatingFolder] = useState(false);
    const [device, _] = useAtom<any>(deviceAtom);
    const [__, setFolders] = useAtom(foldersAtom);
    const [folderName, setFolderName] = useState("");
    const [selectedColor, setSelectedColor] = useState<string>();

    useEffect(() => {
        setFolderName(folder.name);
        setSelectedColor(folder.color);
    }, []);

    const onCompleteAction = () => {
        setCreatingFolder(false);
        editSheetRef.current.close();
    };

    const proceedToEditing = () => {
        setCreatingFolder(true);
        const folderDetails = {
            folderID: folder.folderID,
            name: folderName,
            color: selectedColor,
            deviceID: device.osBuildId,
        };
        editFolder(folderDetails, setFolders, onCompleteAction);
    };

    return (
        <RBSheet
            ref={editSheetRef}
            customStyles={styles.modalStyle}
            customModalProps={{
                animationType: "slide",
                statusBarTranslucent: true,
            }}
            useNativeDriver
            openDuration={150}
            closeDuration={150}
            height={Platform.OS === "android" ? hp(55) : hp(50)}
            draggable
        >
            <Text style={styles.title}>Edit Folder</Text>
            <View style={styles.contentDiv}>
                <View>
                    <TextInput
                        placeholder="Folder name"
                        placeholderTextColor={accentColor}
                        value={folderName}
                        onChangeText={(e) => setFolderName(e)}
                        style={styles.contentDiv.input}
                    />
                </View>
                <View style={styles.contentDiv.colorContent}>
                    <Text style={styles.contentDiv.colorContent.title}>
                        Color
                    </Text>
                    <View style={styles.contentDiv.colorContent.colorList}>
                        {colorList.map((color, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    style={
                                        selectedColor !== color.colorCode
                                            ? styles.contentDiv.colorContent
                                                  .colorCircle
                                            : {
                                                  ...styles.contentDiv
                                                      .colorContent.colorCircle,
                                                  borderColor: selectedColor,
                                              }
                                    }
                                    onPress={() =>
                                        setSelectedColor(color.colorCode)
                                    }
                                >
                                    <Pressable
                                        style={{
                                            ...styles.contentDiv.colorContent
                                                .colorCircle.innerCircle,
                                            backgroundColor: color.colorCode,
                                        }}
                                        onPress={() =>
                                            setSelectedColor(color.colorCode)
                                        }
                                    ></Pressable>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
                <View style={styles.contentDiv.buttonDiv}>
                    <Pressable
                        onPress={() => editSheetRef.current.close()}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        <Text style={styles.contentDiv.buttonDiv.button.text}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={proceedToEditing}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        {creatingFolder ? (
                            <ActivityIndicator color={accentColor} />
                        ) : (
                            <Text
                                style={styles.contentDiv.buttonDiv.button.text}
                            >
                                Save
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
            borderBottomWidth: 1.3,
            borderBottomColor: "rgba(255,255,255,0.7)",
            height: 45,
            color: "rgba(255,255,255,1)",
            fontFamily: "SCPRegularFont",
            fontSize: 17,
        },
        colorContent: {
            paddingTop: 40,
            paddingBottom: 20,
            title: {
                color: "rgba(255,255,255,0.85)",
                fontFamily: "NothingFont",
                letterSpacing: 0.5,
                fontSize: 15,
            },
            colorList: {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 8,
                paddingTop: 15,
                paddingBottom: 10,
            },
            colorCircle: {
                width: wp(12),
                height: wp(12),
                marginTop: 5,
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.07)",
                borderRadius: 100,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 6,
                innerCircle: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 100,
                },
            },
        },
        buttonDiv: {
            flexDirection: "row",
            justifyContent: "center",
            gap: wp(20),
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

export default EditFolderSheet;
