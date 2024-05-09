import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import SearchIcon from "../../assets/icons/SearchIcon";
import { whiteColor } from "../../styles/const";
import { avatarList } from "../../data/avatarList";

const HomeHeader = () => {
    return (
        <View style={styles.homeHeader}>
            <Text style={styles.titleText}>Notine</Text>
            <Pressable style={{ marginTop: -3 }}>
                <Image
                    source={
                        avatarList[
                            Math.floor(Math.random() * avatarList.length)
                        ]
                    }
                    style={{ width: 42.5, height: 42, borderRadius: 60 }}
                />
                {/* <SearchIcon size={{ width: "24", height: "24" }} /> */}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    homeHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
    },
    titleText: {
        color: whiteColor,
        fontSize: 29,
        fontFamily: "NothingFont",
        textTransform: "uppercase",
    },
} as any);

export default HomeHeader;
