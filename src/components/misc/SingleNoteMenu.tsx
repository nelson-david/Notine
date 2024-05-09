import { StyleSheet, Text, View } from "react-native";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import { cardColor, whiteColor } from "../../styles/const";
import EllipsisIcon from "../../assets/icons/EllipsisIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import StarIcon from "../../assets/icons/StarIcon";
import LockIcon from "../../assets/icons/LockIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const SingleNoteMenu = () => {
    return (
        <>
            <Menu style={styles.menu}>
                <MenuTrigger
                    children={
                        <EllipsisIcon size={{ width: "27", height: "27" }} />
                    }
                />
                <MenuOptions
                    optionsContainerStyle={{
                        backgroundColor: cardColor,
                        borderRadius: 25,
                        padding: 12,
                        paddingTop: 13,
                        width: 250,
                    }}
                >
                    <MenuOption
                        onSelect={() => alert(`Delete`)}
                        style={styles.menuOption}
                    >
                        <Text style={styles.menuOption.text}>Save as file</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => alert(`Delete`)}
                        style={styles.menuOption}
                    >
                        <Text style={styles.menuOption.text}>Print</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => alert(`Delete`)}
                        style={styles.menuOption}
                    >
                        <Text style={styles.menuOption.text}>Delete Note</Text>
                    </MenuOption>
                    <View style={styles.flexView}>
                        <MenuOption
                            onSelect={() => alert(`Delete`)}
                            style={styles.flexView.menuOption}
                        >
                            <StarIcon color="rgba(255,255,255,0.8)" />
                        </MenuOption>
                        <MenuOption
                            onSelect={() => alert(`Delete`)}
                            style={styles.flexView.menuOption}
                        >
                            <LockIcon color="rgba(255,255,255,0.8)" />
                        </MenuOption>
                        <MenuOption
                            onSelect={() => alert(`Delete`)}
                            style={styles.flexView.menuOption}
                        >
                            <ShareIcon color="rgba(255,255,255,0.8)" />
                        </MenuOption>
                        <MenuOption
                            onSelect={() => alert(`Delete`)}
                            style={styles.flexView.menuOption}
                        >
                            <TrashIcon color="rgba(255,255,255,0.8)" />
                        </MenuOption>
                    </View>
                </MenuOptions>
            </Menu>
        </>
    );
};

const styles = StyleSheet.create({
    menu: {},
    menuOption: {
        padding: 10,
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
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.1)",
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        padding: 2,
        paddingTop: 20,
        paddingBottom: 15,
        menuOption: {
            padding: wp(2),
        },
    },
} as any);

export default SingleNoteMenu;
