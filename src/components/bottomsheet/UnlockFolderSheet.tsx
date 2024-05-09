import RBSheet from "react-native-raw-bottom-sheet";
import { accentColor, globalSheetStyle, whiteColor } from "../../styles/const";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
            navigate("SingleFolder", { folder });
        } else {
            toastNotification(
                "error",
                "Pin error",
                "The pin you entered is incorrect"
            );
        }
        unlockSheetRef.current.close();
    };

    return (
        <RBSheet
            ref={unlockSheetRef}
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
            <Text style={styles.title}>Enter Pin</Text>
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
                        onPress={() => unlockSheetRef.current.close()}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        <Text style={styles.contentDiv.buttonDiv.button.text}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={proceedToUnlock}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        <Text style={styles.contentDiv.buttonDiv.button.text}>
                            Unlock
                        </Text>
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

export default UnlockFolderSheet;
