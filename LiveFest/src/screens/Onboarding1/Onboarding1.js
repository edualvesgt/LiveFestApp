import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone AntDesign

export const Onboarding1 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={"transparent"} />
            <Image
                source={require('../../../assets/circles.png')}
                style={[styles.image, styles.backgroundImage]}
            />
            <Image
                source={require('../../../assets/Onboarding1.png')}
                style={styles.image}
            />
            <Text style={styles.text}>
                Eventos fáceis de encontrar.
            </Text>
            <View style={styles.bottomContainer}>

                <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')} style={{ flexDirection: 'row' }}>
                    <Text style={styles.linkText}>Avançar</Text>
                    <AntDesign name="arrowright" size={24} color="#4090FE" />
                </TouchableOpacity>

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
        height: 520,
        width: 410,
        marginTop: 70,
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
        marginBottom: 30,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 270,
        marginTop: 90,
        marginBottom: 50,
    },
    linkText: {
        fontSize: 16,
        color: '#4090FE',
        marginRight: 10,
        fontFamily: "Raleway_700Bold",
    },

});
