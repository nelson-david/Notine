import { Pressable, StyleSheet, Text, View } from "react-native";
import { cardColor, whiteColor } from "../../styles/const";
import FolderCardMenu from "../misc/FolderCardMenu";
import { useEffect, useRef, useState } from "react";
import FolderIcon from "../../assets/icons/FolderIcon";
import { useNavigation } from "@react-navigation/native";
import { Nav } from "../../utils/types";
import { getFolderNoteCount } from "../../utils/getFolderNoteCount";
import LockIcon from "../../assets/icons/LockIcon";
import UnlockFolderSheet from "../bottomsheet/UnlockFolderSheet";

const FolderCard = ({ folder, notes }: { folder: any; notes: any }) => {
    const unlockSheetRef = useRef<any>();
    const { navigate } = useNavigation<Nav>();
    const [noteCount, setNoteCount] = useState<number>(0);
    const [cardStyle, setCardStyle] = useState({
        backgroundColor: cardColor,
    });

    useEffect(() => {
        setCardStyle({
            backgroundColor: cardColor,
        });
        const count = getFolderNoteCount(folder.folderID, notes);
        setNoteCount(count);
    }, [cardColor]);

    const clickAction = () => {
        setCardStyle({
            backgroundColor: folder.color,
        });
        setTimeout(() => {
            setCardStyle({
                backgroundColor: cardColor,
            });
        }, 200);
        if (folder.locked) {
            unlockSheetRef.current.open();
        } else {
            navigate("SingleFolder", { folder });
        }
    };

    return (
        <>
            <Pressable
                style={{
                    ...styles.folderCard,
                    ...cardStyle,
                }}
                onPress={clickAction}
            >
                <View style={styles.folderCard.content}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            paddingRight: 8,
                            paddingTop: 5,
                        }}
                    >
                        {folder.locked ? (
                            <LockIcon
                                size={{ height: "19", width: "19" }}
                                color="rgba(255,255,255,0.75)"
                            />
                        ) : (
                            ""
                        )}
                    </View>
                    <View style={styles.folderCard.content.circleDiv}>
                        <Pressable
                            style={styles.folderCard.content.circleDiv.circle}
                            onPress={clickAction}
                        >
                            <FolderIcon
                                color={folder.color}
                                size={{ height: "27", width: "27" }}
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.folderCard.content.text}>
                        {folder.name}
                    </Text>
                    <View style={styles.folderCard.content.footer}>
                        <Text style={styles.folderCard.content.infoText}>
                            {noteCount} Note(s)
                        </Text>
                        <FolderCardMenu folder={folder} />
                    </View>
                </View>
            </Pressable>
            <UnlockFolderSheet
                folder={folder}
                unlockSheetRef={unlockSheetRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    folderCard: {
        width: "45%",
        height: "auto",
        borderRadius: 25,
        padding: 0,
        border: "none",
        content: {
            padding: 15,
            circleDiv: {
                flexDirection: "row",
                justifyContent: "center",
                circle: {
                    width: 50,
                    height: 50,
                    borderRadius: 60,
                    backgroundColor: "#000000",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
            },
            text: {
                color: whiteColor,
                textAlign: "center",
                paddingTop: 22,
                fontSize: 18,
                fontFamily: "NothingFont",
            },
            infoText: {
                fontFamily: "SCPFont",
                textAlign: "center",
                fontSize: 14,
                color: "rgba(255,255,255,0.8)",
                letterSpacing: -0.4,
            },
            footer: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 15,
                paddingLeft: 5,
                paddingRight: 0,
                paddingBottom: 5,
            },
        },
    },
} as any);

export default FolderCard;
