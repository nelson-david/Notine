import { Pressable, View, StyleSheet, Text } from "react-native";
import ChevronLeftIcon from "../../assets/icons/ChevronLeftIcon";
import { Nav } from "../../utils/types";
import { useNavigation } from "@react-navigation/native";
import BookIcon from "../../assets/icons/BookIcon";
import SingleNoteMenu from "../misc/SingleNoteMenu";

const SNNavigationHeader = ({
    backAction,
    customFunction,
}: {
    title?: string;
    backAction?: string;
    customFunction?: any;
}) => {
    const { navigate, goBack } = useNavigation<Nav>();

    const onBackAction = () => {
        if (customFunction) {
            customFunction();
        } else {
            if (backAction) {
                navigate(backAction);
            } else {
                goBack();
            }
        }
    };

    return (
        <View style={styles.navigationHeaderBar}>
            <Pressable
                style={styles.navigationHeaderBar.arrowButton}
                onPress={onBackAction}
            >
                <ChevronLeftIcon
                    size={{ width: "40", height: "40" }}
                    color="#ffffff"
                />
            </Pressable>
            <View style={styles.navigationHeaderBar.rightContent}>
                <Pressable>
                    <BookIcon size={{ width: "25", height: "25" }} />
                </Pressable>
                <SingleNoteMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navigationHeaderBar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        arrowButton: {
            width: 50,
            height: 50,
            backgroundColor: "rgba(0,0,0,0.0)",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 0,
            marginLeft: -6,
        },
        rightContent: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
        },
    },
} as any);

export default SNNavigationHeader;
