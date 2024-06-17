import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import InputSearch from "../../components/InputSearch/InputSearch";
import {
  Container,
  ContainerMarginStatusBar,
} from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from "../../components/Texts/Texts";
import api from "../../service/service";
import Carrossel from "../../components/Carrosel/Carrosel";

import moment from "moment";
import { CardEvents } from "../../components/CardEvents/CardEvents";


export const Home = ({ navigation }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [dataEvents, setDataEvents] = useState(null)
  const [listEvent, setListEvent] = useState(dataEvents);

  async function getEvents() {
    try {
      const response = await api.get("/Events");
      const events = response.data;
  
      // Sort the events by date in ascending order
      const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      // Update the state with the sorted events
      setDataEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterEvents = (text) => {
    const normalizedText = removeAccents(text.toLowerCase());
    const filteredEvents = dataEvents.filter(event =>
      removeAccents(event.eventName.toLowerCase()).includes(normalizedText) ||
      removeAccents(event.address.city.toLowerCase()).includes(normalizedText) ||
      removeAccents(moment(event.date).format("DD/MM/YYYY").toLowerCase()).includes(normalizedText)
    );
  
    // Sort the filtered events by date in ascending order
    const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    setListEvent(sortedEvents);
    setValue(text);
  };

  // const filterEvents = (text) => {
  //   const filteredEvents = dataEvents.filter(event =>
  //     event.eventName.toLowerCase().includes(text.toLowerCase()) ||
  //     event.address.city.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setListEvent(filteredEvents);
  //   setValue(text);
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={()=>{}}
    >
      <CardEvents
        description={item.description}
        titleEvent={item.eventName}
        time={moment(item.date).format("DD/MM/YYYY")}
      />
    </TouchableOpacity>
  );

  useEffect(() => { getEvents() }, [])

  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"} style={{backgroundColor:"#F7F8FA"}}>
        <StatusBar style="auto" />
        <View style={{}}>
          <TextTitle>Home</TextTitle>
          <TextInput
            style={[styles.input, isFocus && { borderColor: '#956ADF' }]}
            placeholder="Buscar eventos ou cidades"
            value={value}
            onChangeText={(text) => filterEvents(text)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          {/* <InputSearch dataEvents={dataEvents}/> */}
        </View>

        <TextTitle>Eventos perto de você</TextTitle>

        {
           dataEvents!==null ?
        <Carrossel events={dataEvents}/>
: <></>
        }

        <TextTitle>Próximos eventos</TextTitle>

        <FlatList
          data={value === "" ? dataEvents : listEvent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

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
  input: {
    height: 50,
    borderColor: '#956ADF',
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 80,
  }
});
