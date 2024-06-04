import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InputSearch from "../../components/InputSearch/InputSearch";
import { Container, ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from "../../components/Texts/Texts";
import { Logo } from "../../components/Logo/Logo";

export const Home = ({ navigation }) => {
  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto"/>
        <TextTitle>Home</TextTitle>
        <View style={styles.ContainerImput}>
          <InputSearch></InputSearch>
        </View>
        <TextTitle>Eventos perto de você</TextTitle>

        <TextTitle>Próximos eventos</TextTitle>
        
      </ContainerMarginStatusBar>
    </>
  );
};

const styles = StyleSheet.create({
  ContainerImput: {
    flex: 1,
  },
});
