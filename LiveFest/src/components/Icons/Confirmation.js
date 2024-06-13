import React from 'react';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function ConfirmationIcon({size}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 191 191" fill="none">
            <Circle opacity="0.5" cx="95.5" cy="95.5" r="95.5" fill="url(#paint0_linear_1439_961)"/>
            <Circle cx="95.5" cy="95.5" r="75.5" fill="url(#paint1_linear_1439_961)"/>
            <Path d="M65 93.8177L86.6785 115L126 75" stroke="#FFFDFD" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round"/>
            <Defs>
                <LinearGradient id="paint0_linear_1439_961" x1="0" y1="191" x2="191" y2="0" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#4090FE"/>
                </LinearGradient>
                <LinearGradient id="paint1_linear_1439_961" x1="20" y1="171" x2="171" y2="20" gradientUnits="userSpaceOnUse">
                    <Stop offset="1" stopColor="#4090FE"/>
                </LinearGradient>
            </Defs>
        </Svg>
    );
}
