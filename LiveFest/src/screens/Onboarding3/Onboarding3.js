import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importe o ícone AntDesign


export const Onboarding3 = ({ navigation }) => {
    return (
        <View style={styles.container}>
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
            <View style={styles.bottomContainer}>
               
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.linkText}>Avançar</Text>
                </TouchableOpacity>
                <AntDesign name="arrowright" size={24} color="#4090FE" />
            
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
        marginBottom: 40,
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
