import Svg, { Path } from "react-native-svg";

const LockIcon = ({
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
                    d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                />
                <Path
                    d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <Path
                    d="M12 14V18"
                    stroke={color ? color : "#ffffff"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </Svg>
        </>
    );
};

export default LockIcon;
