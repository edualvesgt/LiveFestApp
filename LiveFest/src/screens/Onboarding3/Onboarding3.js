import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone AntDesign
import ButtonDefault from '../../components/ButtonDefault/ButtonDefault';


export const Onboarding3 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={"transparent"} /><StatusBar translucent={true} barStyle={"dark-content"} />
            <Image
                source={require('../../../assets/circles.png')}
                style={[styles.image, styles.backgroundImage]}
            />
            <Image
                source={require('../../../assets/Onboarding3.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>
                Conheça novas pessoas.
            </Text>
            <View style={{ width: "90%" }}>
                <ButtonDefault text="Iniciar" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    image: {
        height: 400,
        width: 300,
        marginTop: 100,
        marginBottom: 100,


    },
    backgroundImage: {
        position: 'absolute',
        zIndex: -1,  // Garante que a imagem de fundo fique abaixo da imagem principal
    },
    text: {
        position: 'absolute',
        bottom: 100,
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: "Raleway_700Bold",
        marginBottom: 50,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 270,
        marginTop: 170,
    },
    linkText: {
        fontSize: 16,
        color: '#4090FE',
        marginRight: 10,
        fontFamily: "Raleway_700Bold",
    },

});
