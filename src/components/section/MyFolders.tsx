import { Pressable, StyleSheet, Text, View } from "react-native";
import { whiteColor } from "../../styles/const";
import { folderList } from "../../data/folderList";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";

const MyFolders = ({
    folderSheetRef,
    notesExist,
}: {
    folderSheetRef: any;
    notesExist: any;
}) => {
    const { navigate } = useNavigation<Nav>();
    return (
        <View
            style={
                notesExist
                    ? styles.myFolders
                    : { ...styles.myFolders, position: "absolute", bottom: 0 }
            }
        >
            <Text style={styles.titleText}>My Folders</Text>
            <View style={styles.foldersContainer}>
                {folderList.map((folder, index) => {
                    return (
                        <View key={index} style={styles.singleFolder}>
                            <Pressable
                                style={{
                                    ...styles.singleFolder.content,
                                    backgroundColor: folder.color,
                                }}
                                onPress={
                                    folder.title === "+"
                                        ? () => folderSheetRef.current.open()
                                        : () => navigate("Folder")
                                }
                            >
                                <Text
                                    style={{
                                        ...styles.singleFolder.content.text,
                                        color: folder.fontColor,
                                    }}
                                >
                                    {folder.title}
                                </Text>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    myFolders: {
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
    },
    titleText: {
        color: whiteColor,
        fontSize: 22,
        fontFamily: "NothingFont",
        paddingTop: 10,
        paddingBottom: 10,
    },
    foldersContainer: {
        padding: 5,
        paddingBottom: 20,
        paddingTop: 15,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 25,
    },
    singleFolder: {
        width: wp(38),
        height: wp(38),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        content: {
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            padding: 10,
            text: {
                fontSize: 50,
                fontFamily: "NothingFont",
            },
        },
    },
} as any);

export default MyFolders;
