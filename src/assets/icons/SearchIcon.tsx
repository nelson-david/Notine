import Svg, { Path } from "react-native-svg";

const SearchIcon = ({
    color,
    size,
}: {
    color?: string;
    size?: { width: string; height: string };
}) => {
    return (
        <>
            <Svg
                width={size ? size.width : "25"}
                height={size ? size.height : "25"}
                viewBox="0 0 24 24"
                fill="none"
            >
                <Path
                    d="M14 5H20"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M14 8H17"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M22 22L20 20"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </>
    );
};

export default SearchIcon;
