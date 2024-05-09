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
import { useState } from "react";
import { colorList } from "../../data/colorList";
import { generateRandomId } from "../../helpers/generateRandomId";
import { createNewFolder } from "../../helpers/dbFunctions";
import { useAtom } from "jotai";
import { deviceAtom, foldersAtom } from "../../utils/jotaiAtom";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";

const ConfirmDeleteSheet = ({
    deleteSheetRef,
    processing,
    actionToTake,
    question,
}: {
    deleteSheetRef: any;
    processing: Boolean;
    actionToTake: any;
    question: string;
}) => {
    return (
        <RBSheet
            ref={deleteSheetRef}
            customStyles={styles.modalStyle}
            customModalProps={{
                animationType: "slide",
                statusBarTranslucent: true,
            }}
            useNativeDriver
            openDuration={150}
            closeDuration={150}
            height={Platform.OS === "android" ? hp(20) : hp(15)}
            draggable
        >
            <View style={styles.contentDiv}>
                <Text style={styles.contentDiv.questionText}>{question}</Text>
                <View style={styles.contentDiv.buttonDiv}>
                    <Pressable
                        onPress={() => deleteSheetRef.current.close()}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        <Text style={styles.contentDiv.buttonDiv.button.text}>
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={actionToTake}
                        style={styles.contentDiv.buttonDiv.button}
                    >
                        {processing ? (
                            <ActivityIndicator color={accentColor} />
                        ) : (
                            <Text
                                style={styles.contentDiv.buttonDiv.button.text}
                            >
                                Move to Recycle bin
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
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        questionText: {
            color: "rgba(255,255,255,0.9)",
            fontFamily: "NothingFont",
            letterSpacing: 1.1,
            lineHeight: 22,
            textAlign: "left",
            paddingBottom: 10,
        },
        buttonDiv: {
            flexDirection: "row",
            justifyContent: "center",
            gap: wp(15),
            paddingTop: 10,
            button: {
                backgroundColor: "rgba(0,0,0,0.09)",
                height: 38,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 50,
                text: {
                    color: whiteColor,
                    fontSize: 12,
                    fontFamily: "NothingFont",
                    letterSpacing: 0.5,
                },
            },
        },
    },
});

export default ConfirmDeleteSheet;
