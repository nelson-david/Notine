import Svg, { Path } from "react-native-svg";
import { useIconColor } from "../../theme/useIconColor";

const PlusIcon = ({
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
                d="M12 5V19M5 12H19"
                stroke={c}
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </Svg>
    );
};

export default PlusIcon;
