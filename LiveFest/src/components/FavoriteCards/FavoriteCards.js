import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const FavoriteCards = ({ title, date, color, onPress, onDelete, route }) => {
  const [starColor, setStarColor] = useState("yellow");

  const handleStarPress = () => {
    const newColor = starColor === "yellow"? "white" : "yellow";
    setStarColor(newColor);
  };

  const renderRightActions = (progress, dragX, swipeToDelete) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity onPress={() => onDelete(title)}>
        <Animated.View
          style={{
            transform: [{ translateX: trans }],
          }}
        >
          <View style={styles.deleteButton}>
            <Ionicons name="trash" size={24} color="#fff" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onDelete)
        }
      >
        <TouchableOpacity
          onPress={onPress}
          style={[styles.cardContainer, { backgroundColor: color }]}
        >
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDate}>{date}</Text>
          </View>
          <Ionicons
            name="star"
            size={24}
            color={starColor}
            onPress={handleStarPress}
          />
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 180,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 24,
        color: "#fff",
        fontFamily: "MontserratAlternates_500Medium",
    },
    cardDate: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "MontserratAlternates_500Medium",
    },
    deleteButton: {
        backgroundColor: "#D75353",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 187,
        borderRadius: 10,
    },
});
