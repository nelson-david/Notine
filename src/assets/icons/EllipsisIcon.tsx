import Svg, { Path } from "react-native-svg";

const EllipsisIcon = ({
    size,
    color,
}: {
    color?: string;
    size?: { width: string; height: string };
}) => {
    return (
        <>
            <Svg
                fill={color ? color : "#ffffff"}
                width={size ? size.width : "30"}
                height={size ? size.height : "30"}
                viewBox="0 0 16 16"
            >
                <Path d="M8 2.5a1.22 1.22 0 0 1 1.25 1.17A1.21 1.21 0 0 1 8 4.84a1.21 1.21 0 0 1-1.25-1.17A1.22 1.22 0 0 1 8 2.5zm0 8.66a1.17 1.17 0 1 1-1.25 1.17A1.21 1.21 0 0 1 8 11.16zm0-4.33a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 1 1 0-2.34z" />
            </Svg>
        </>
    );
};

export default EllipsisIcon;
