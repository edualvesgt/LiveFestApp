import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const FavoriteCards = ({ title, date, color, onPress, onDelete, route }) => {
  const [starColor, setStarColor] = useState("yellow");

  const handleStarPress = () => {
    const newColor = starColor === "yellow" ? "white" : "yellow";
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
    <View style={{width:"100%", marginVertical: 10}}>
      {/* <GestureHandlerRootView > */}
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onDelete)
          }
        >
        <View style={{width:"100%"}}>

          <TouchableOpacity
            onPress={onPress}
            style={[styles.cardContainer, { backgroundColor: color }]}
          >
            <View style={{ alignItems: "center"}}>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={styles.cardDate}>{date}</Text>

              <Ionicons
                name="star"
                size={24}
                color={starColor}
                onPress={handleStarPress}
              />
            </View>
          </TouchableOpacity>
        </View>
        </Swipeable>
      {/* </GestureHandlerRootView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 180,
    width: "100%",
    // flexDirection: "",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    borderRadius: 10,
  },
  cardTitle: {
    textAlign:"center",
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
    height: 180,
    borderRadius: 10,
  },
});
