import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import InputSearch from "../../components/InputSearch/InputSearch";
import { TextTitle } from "../../components/Texts/Texts";
import { FavoriteCards } from "../../components/FavoriteCards/FavoriteCards";
import api from "../../service/service";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'

const colors = [
  "#BA68C8",
  "#4DB6E8",
  "#81C784",
  "#FF8A65",
  "#FFD54F",
  "#4DB6AC",
  "#7986CB",
  "#FF7043",
  "#8D6E63",
  "#AED581",
  "#64B5F6",
  "#F06292",
];

const FavoriteItem = ({ title, date, color, onPress }) => (
  <View style={[styles.cardContainer, { backgroundColor: color }]}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDate}>{date}</Text>
    </View>
    <Ionicons name="star" size={24} color="yellow" />
  </View>
);

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
})

export const Favorites = ({ route }) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused()
  const [isFocus, setIsFocus] = useState(false);
  const [listEvent, setListEvent] = useState(null);


  // Chamada à API para obter os dados dos eventos favoritos
  async function GetEventsSaved() {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      const response = await api.get(`/SaveEvents/All?userID=${userId}`);

      // Mapeia a estrutura de dados recebida para o formato esperado pela FlatList
      const mappedFavorites = response.data.map((item) => ({
        id: item.events.id,
        title: item.events.eventName,
        date: new Date(item.events.date).toLocaleDateString(),
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setFavorites(mappedFavorites);
    } catch (error) {
      console.log("log error");
      console.log(error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      GetEventsSaved();
    }
  }, [isFocused]);

  // const removeAccents = (str) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // };

  // const filterEvents = (text) => {
  //   const normalizedText = removeAccents(text.toLowerCase());
  //   const filteredEvents = favorites.filter(event =>
  //     removeAccents(event.title.toLowerCase()).includes(normalizedText) ||
  //     removeAccents(moment(event.date).format("DD/MM/YYYY").toLowerCase()).includes(normalizedText)
  //   );

  //   // Sort the filtered events by date in ascending order
  //   const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  //   setListEvent(sortedEvents);
  //   setSearch(text);
  // };


  const handleDelete = async (eventId,title) => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      await api.delete(`/SaveEvents/Delete?userID=${userId}&eventID=${eventId}`);
      // Atualiza a lista de favoritos após deletar
      setFavorites(favorites.filter((item) => item.id !== eventId));
      handleCallNotifications(title)
    } catch (error) {
      console.error('Error deleting favorite event', error);
    }
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // function shouldIncludeItem(item, searchTerm) {
  //   if (item.title && item.date) {
  //     console.log(item.date)
  //     const lowerSearch = searchTerm.toLowerCase();

  //     const filteredEvents = item.filter(event =>
  //       removeAccents(event.title.toLowerCase()).includes(lowerSearch) ||
  //       removeAccents(moment(item.date).format("DD/MM/YYYY").toLowerCase()).includes(lowerSearch)
  //     )

  //     return filteredEvents
  //   }
  //   return false;
  // }

  const shouldIncludeItem = (item, searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();
    return removeAccents(item.title.toLowerCase()).includes(lowerSearch) ||
      removeAccents(moment(item.date, "DD/MM/YYYY").format("DD/MM/YYYY").toLowerCase()).includes(lowerSearch);
  }

  const handleCallNotifications = async (title) => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      alert('Você não habilitou, receber notificação no app.');
      return;
    }

    // const token = await Notifications.getExpoPushTokenAsync();
    // console.log(token)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Evento Removido dos favoritos',
        body: `O envento "${title}"  foi cancelado com sucesso.`
      },
      trigger: null
    })
  }

  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"} style={{ alignItems: "center" }}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#4090FE" />
          </TouchableOpacity> */}
          <View style={styles.headerTitleContainer}>
            <TextTitle>Favoritos</TextTitle>
          </View>
        </View>

        {/* <InputSearch value={search} onChangeText={(text) => setSearch(text)} /> */}
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width:"90%"}} >
            <TextInput
              style={[styles.input, isFocus && { borderColor: '#956ADF' }]}
              placeholder="Buscar eventos ou cidades"
              value={search}
              onChangeText={(text) => setSearch(text)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}

            >
            </TextInput>
            { search.length > 0 && (
              <TouchableOpacity onPress={()=> setSearch('')}>
                <Entypo
                  name="erase"
                  size={24}
                  color="#956ADF"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            )
            }
          </View>
        <GestureHandlerRootView >
          <View style={{padding:20}} >

            <FlatList
              data={search !== "" ?
                favorites.filter((item) =>
                  shouldIncludeItem(item, search)) :
                favorites}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <FavoriteCards
                  title={item.title}
                  date={item.date}
                  color={colors[index % colors.length]}
                  onPress={() =>
                    navigation.navigate("DetailedCard", {
                      dataCard: item.id,
                    })
                  }
                  onDelete={() => {
                    handleDelete(item.id,item.title)
                    }}
                />

              )}
            />
          </View>
        </GestureHandlerRootView>
      </ContainerMarginStatusBar>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
  },
  input: {
    flex:1,
    height: 50,
    borderColor: '#956ADF',
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardDate: {
    fontSize: 16,
    color: "#fff",
  },
  header: {
    height: 120,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  stickyHeader: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 38,
  },
  flatListContent: {
    paddingTop: 55,
    paddingBottom: 15,
  },
});
