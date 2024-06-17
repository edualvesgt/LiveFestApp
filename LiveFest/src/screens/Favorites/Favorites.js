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
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import InputSearch from "../../components/InputSearch/InputSearch";
import { TextTitle } from "../../components/Texts/Texts";
import { FavoriteCards } from "../../components/FavoriteCards/FavoriteCards";

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

const mockFavorites = [
  { id: "1", title: "Festas e shows", date: "09 Jun 2024", color: "#BA68C8" },
  {
    id: "2",
    title: "Cursos e Workshops",
    date: "09 Jun 2024",
    color: "#4DB6E8",
  },
  { id: "3", title: "Gastronomia", date: "09 Jun 2024", color: "#81C784" },
  { id: "4", title: "Tecnologia", date: "09 Jun 2024", color: "#FF8A65" },
  {
    id: "5",
    title: "Turismo e Viagens",
    date: "09 Jun 2024",
    color: "#FFD54F",
  },
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

export const Favorites = () => {
  const navigation = useNavigation();
  //   const [favorites, setFavorites] = useState([]);
  const [favorites, setFavorites] = useState(mockFavorites); // Usando dados mock
  const [search, setSearch] = useState("");

  useEffect(() => {

    const fetchFavorites = async () => {
      const response = await fetch("URL_DA_API");
      const data = await response.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  const handleDelete = (title) => {
    setFavorites(favorites.filter((item) => item.title !== title));
  };

  return (
    <View style={styles.container}>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto" />
        <View style={styles.stickyHeader}>
          <ImageBackground
            source={require("../../../assets/Header Rota do Evento.png")}
            style={styles.header}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Favoritos</Text>
          </ImageBackground>
        </View>

        <InputSearch></InputSearch>

        <FlatList
         contentContainerStyle={styles.flatListContent}
          data={favorites.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <FavoriteCards
              title={item.title}
              date={item.date}
              color={colors[index % colors.length]}
              onPress={() =>
                navigation.navigate("DetailedCard", {
                  eventData: item,
                })
              }
              onDelete={() => handleDelete(item.title)}
            />
          )}
        />
      </ContainerMarginStatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginRight: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color:"#fff"
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
