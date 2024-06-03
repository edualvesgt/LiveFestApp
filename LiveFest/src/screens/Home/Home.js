import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Conteúdo da Home</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
