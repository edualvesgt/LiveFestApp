import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
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

export const Favorites = ({ route }) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
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

    GetEventsSaved();
  }, []);



  const handleDelete = async (eventId) => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      await api.delete(`/SaveEvents/Delete?userID=${userId}&eventID=${eventId}`);
      // Atualiza a lista de favoritos após deletar
      setFavorites(favorites.filter((item) => item.id !== eventId));
    } catch (error) {
      console.error('Error deleting favorite event', error);
    }
  };

  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#4090FE" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <TextTitle>Favoritos</TextTitle>
          </View>
        </View>

        <InputSearch value={search} onChangeText={(text) => setSearch(text)} />

        <FlatList
          data={favorites.filter((item) =>
            item.title ? item.title.toLowerCase().includes(search.toLowerCase()) : false
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <FavoriteCards
              title={item.title}
              date={item.date}
              color={item.color}
              onPress={() =>
                navigation.navigate("DetailedCard", {
                  eventData: item,
                })
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
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
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
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
});
