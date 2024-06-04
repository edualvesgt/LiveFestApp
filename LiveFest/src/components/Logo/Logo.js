import { Image } from 'react-native'

export const Logo = () => {
    return (
        <Image
        source={require("../../../assets/Logo 3 COLORIDO.png")}
        style={{height: 160, width: 100, alignSelf: 'center', marginTop: 40}}
        />
    )
}