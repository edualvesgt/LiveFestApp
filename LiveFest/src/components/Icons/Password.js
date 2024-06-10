import Svg, { Circle, Path } from 'react-native-svg';


export default function PasswordIcon({ color, size }) {
    return (
        <>
            <Svg width={size} height={size} viewBox="0 0 18 20" fill="none">
                <Path
                    d="M1 11C1 9.11438 1 8.17157 1.58579 7.58579C2.17157 7 3.11438 7 5 7H13C14.8856 7 15.8284 7 16.4142 7.58579C17 8.17157 17 9.11438 17 11V13C17 15.8284 17 17.2426 16.1213 18.1213C15.2426 19 13.8284 19 11 19H7C4.17157 19 2.75736 19 1.87868 18.1213C1 17.2426 1 15.8284 1 13V11Z"
                    stroke="#4090FE"
                    strokeWidth="2" 
                />
                <Path
                    d="M13 6V5C13 2.79086 11.2091 1 9 1V1C6.79086 1 5 2.79086 5 5V6"
                    stroke="#4090FE"
                    strokeWidth="2" 
                    strokeLinecap="round"
                />
                <Circle cx="9" cy="13" r="2" fill={color} />
            </Svg>
        </>
    );
}
