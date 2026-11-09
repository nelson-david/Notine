import Svg, { Path } from "react-native-svg";
import { useIconColor } from "../../theme/useIconColor";

const RestoreIcon = ({
    color,
    size,
}: {
    color?: string;
    size?: { width: string; height: string };
}) => {
    const c = useIconColor(color);
    return (
        <Svg
            width={size ? size.width : "24"}
            height={size ? size.height : "24"}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M4 12a8 8 0 1 0 2.34-5.66L4 8.67"
                stroke={c}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 4v4.67h4.67"
                stroke={c}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default RestoreIcon;
