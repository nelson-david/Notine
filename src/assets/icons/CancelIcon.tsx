import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

const CancelIcon = ({ pressFunction }: { pressFunction: any }) => {
    return (
        <Pressable style={{ marginLeft: 8 }} onPress={pressFunction}>
            <Svg width="18" height="18" viewBox="0 0 9 9" fill="none">
                <Path
                    d="M8.00001 0.999985L1.00002 7.99998M8.00002 7.99998L1.00002 0.999985"
                    stroke="#222628"
                    strokeWidth="1.57242"
                    strokeLinecap="round"
                />
            </Svg>
        </Pressable>
    );
};

export default CancelIcon;
