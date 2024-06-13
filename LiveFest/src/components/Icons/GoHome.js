import React from 'react';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function GoHomeIcon({size}) {
    return (
        <Svg width={size} height={size} viewBox="0 0 72 72" fill="none">
            <Circle cx="36" cy="36" r="36" fill="#4090FE"/>
            <Path d="M52 42.2843L36 26L20 42.2843L22.6664 45L36 31.4275L49.3336 45L52 42.2843Z" fill="white"/>
        </Svg>
    );
}
