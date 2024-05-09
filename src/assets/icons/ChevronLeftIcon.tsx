import Svg, { Path } from "react-native-svg";

const ChevronLeftIcon = ({
    size,
    color,
}: {
    color?: string;
    size?: { width: string; height: string };
}) => {
    return (
        <>
            <Svg
                width={size ? size.width : "30"}
                height={size ? size.height : "30"}
                viewBox="0 0 24 24"
                fill="none"
            >
                <Path
                    d="M15 6L9 12L15 18"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </>
    );
};

export default ChevronLeftIcon;
