import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const FavoriteCards = ({ title, date, color, onPress }) => {
  const [starColor, setStarColor] = useState('yellow');

  const handleStarPress = () => {
    // Alterna a cor da estrela entre amarelo e branco
    const newColor = starColor === 'yellow' ? 'white' : 'yellow';
    setStarColor(newColor);
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.cardContainer, { backgroundColor: color }]}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{date}</Text>
      </View>
      <Ionicons 
        name="star" 
        size={24} 
        color={starColor} // Usa o estado starColor para definir a cor da estrela
        onPress={handleStarPress} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: "Raleway_700Bold"
  },
  cardDate: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "Raleway_700Bold"
  },
});
