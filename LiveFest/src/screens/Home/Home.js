import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputSearch from "../../components/InputSearch/InputSearch";
import {
  Container,
  ContainerMarginStatusBar,
} from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from "../../components/Texts/Texts";
import api from "../../service/service";
import Carrossel from "../../components/Carrosel/Carrosel";



export const Home = ({ navigation }) => {


  const [dataEvents, setDataEvents] = useState(null)

  async function getEvents() {
    await api.get("/Events")
      .then((response) => {
        console.log(response.data)
        setDataEvents(response.data)
      }
      )
  }

  useEffect(() => { getEvents() }, [])
  
  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto" />

        <View style={styles.ContainerImput}>
          <TextTitle>Home</TextTitle>
          <InputSearch dataEvents={dataEvents}/>
        </View>
        <TextTitle>Eventos perto de você</TextTitle>
        <Carrossel events={dataEvents}></Carrossel>


        <TextTitle>Próximos eventos</TextTitle>
      </ContainerMarginStatusBar>
    </>
  );
};

const styles = StyleSheet.create({
  ContainerImput: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});
