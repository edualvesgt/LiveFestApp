import Svg, { Path } from 'react-native-svg';


export default function EmailIcon({ color, size }) {
    return (
        <>
            <Svg width={size} height={size} viewBox="0 0 17 13" fill="none">
                <Path 
                    d="M15.3 13H1.7C0.761116 13 0 12.2725 0 11.375V1.55431C0.0396171 0.684571 0.789253 -0.000822555 1.7 7.40928e-07H15.3C16.2389 7.40928e-07 17 0.727539 17 1.625V11.375C17 12.2725 16.2389 13 15.3 13ZM1.7 3.14275V11.375H15.3V3.14275L8.5 7.475L1.7 3.14275ZM2.38 1.625L8.5 5.525L14.62 1.625H2.38Z" 
                    fill={color} 
                />
            </Svg>
        </>
    );
}