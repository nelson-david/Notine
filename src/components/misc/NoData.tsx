import { StyleSheet, Text, View } from "react-native";
import { whiteColor } from "../../styles/const";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const NoData = ({
    customHeaderText,
    customCaptionText,
}: {
    customHeaderText?: string;
    customCaptionText?: string;
}) => {
    return (
        <View style={styles.noDataView}>
            <View>
                <Text style={styles.noDataView.text1}>
                    {customHeaderText ? customHeaderText : "No Notes"}
                </Text>
                <Text style={styles.noDataView.text2}>
                    {customCaptionText
                        ? customCaptionText
                        : "Tap the Add button to create a new note"}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    noDataView: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: hp(55),
        text1: {
            color: whiteColor,
            textAlign: "center",
            fontSize: 18,
            fontFamily: "NothingFont",
        },
        text2: {
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            fontSize: 13,
            fontFamily: "SCPFont",
            letterSpacing: -0.5,
            padding: 5,
        },
    },
} as any);

export default NoData;
