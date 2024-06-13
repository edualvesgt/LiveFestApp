import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextButtonDefault } from "../../components/Texts/Texts";
import api from "../../service/service";

const mapApiDataToEventData = (apiData) => {
  return {
    event_name: apiData.eventName,
    event_date: new Date(apiData.date).toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "long",
    }),
    event_time: new Date(apiData.date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    description: apiData.description || "Descrição não fornecida.",
    organizer: {
      name: apiData.organizer || "Organizador não fornecido",
      contact: apiData.phoneNumber,
    },
    location: "Localização não fornecida",
    attendees: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/women/10.jpg",
    ],
    contact: {
      phone: apiData.phoneNumber,
      email: apiData.email,
    },
    
  };
};

export const DetailedCard = () => {
  const [eventData, setEventData] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  // const { eventId } = route.params; 
  const eventId = route.params.eventData?.id; 

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  const fetchEventData = async (eventId) => {
    try {
      console.log("Fetching event data for ID:", eventId);

      const response = await api.get(`/Events/GetById?id=${eventId}`);
      console.log("API response:", response.data); 
      const data = response.data;
      
      const eventData = mapApiDataToEventData(data);
      console.log(eventData)
      setEventData(eventData);

    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      if (error.response) {
        console.error("Server responded with a status:", error.response.status);
      } else if (error.request) {
        console.error("Request was made but no response received:", error.request);
      } else {
        console.error("Something went wrong while setting up the request:", error.message);
      }
    }
  };

  const saveEventToApi = async () => {
    try {
      const userId = "3fa85f64-5717-4562-b3fc-2c963f66afa6"; // Substitua pelo ID do usuário logado
      const eventToSave = {
        userID: userId,
        eventID: eventId,
      };
      const response = await api.post(
        "/SaveEvents/EventosDoUsuario",
        eventToSave
      );
      console.log("Evento salvo com sucesso na API:", response.data);

      // Exibir feedback ao usuário
      Alert.alert(
        "Sucesso",
        "Evento salvo com sucesso nos favoritos!",
        [{ text: "OK", onPress: () => navigation.navigate("Favorites") }]
      );
    } catch (error) {
      console.error("Erro ao salvar evento na API:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao salvar o evento. Por favor, tente novamente."
      );
    }
  };

  const navigateToFavorites = () => {
    navigation.navigate("Favorites", { event: eventData });
  };

  if (!eventData) {
    return <Text>Carregando...</Text>;
  }

  // const openMaps = () => {
  //   navigation.navigate("Map", {
  //     latitudeEvento: -23.448563,
  //     longitudeEvento: -46.534352,
  //     nomeEvento: eventData.event_name,
  //     dataEvento: eventData.event_date,
  //     descricaoEvento: eventData.description,
  //   });
  // };

  const openMaps = async () => {
    try {
      
      const response = await api.get('http://192.168.21.118:5190/api/Address');
      const locationData = response.data;
  
      
      navigation.navigate("Map", {
        latitudeEvento: locationData.latitude,
        longitudeEvento: locationData.longitude,
        nomeEvento: eventData.event_name,
        dataEvento: eventData.event_date,
        descricaoEvento: eventData.description,
      });
    } catch (error) {
      console.error("Erro ao buscar localização do evento:", error);
      Alert.alert("Erro", "Não foi possível encontrar a localização do evento.");
    }
  };
  

  const navigateHome = () => {
    navigation.navigate("Favorites", { event: eventData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <ImageBackground
          source={require("../../../assets/Group 4.png")}
          style={styles.header}
        >
          <TouchableOpacity onPress={navigateHome} style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agenda de Eventos</Text>
        </ImageBackground>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{eventData.event_name}</Text>
        <Text style={styles.date}>{`${eventData.event_date}, ${eventData.event_time}`}</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        {eventData.organizer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizado por</Text>
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>{eventData.organizer.name}</Text>
            </View>
            <Text style={styles.contact}>{eventData.organizer.contact}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <TouchableOpacity onPress={openMaps}>
            <Text style={styles.location}>
              {eventData.location}{" "}
              <Image
                source={require("../../../assets/google map.png")}
                style={styles.icon}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pessoas presentes</Text>
          <FlatList
            data={eventData.attendees}
            horizontal
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.attendeeImage} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity>
            <Text style={styles.moreAttendees}>
              +6 More people are attending
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.contact}>{eventData.contact.phone}</Text>
          <Text style={styles.contact}>{eventData.contact.email}</Text>
        </View>
        <Text style={styles.sectionTitle2}>Eventos perto de você</Text>
        <View style={styles.nearbyEvents}>
          <TouchableOpacity style={styles.eventCard}>
            <Text style={styles.eventCardText}>Moda e Beleza</Text>
            <Text style={styles.eventCardDate}>09 Jun 2018</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonParticipar}
          onPress={() => navigation.navigate("Favorites")}
        >
          <TextButtonDefault>Participar</TextButtonDefault>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  stickyHeader: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  scrollView: {
    marginTop: 115,
  },
  header: {
    padding: 16,
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 38,
  },
  headerTitle: {
    padding: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "white",
  },
  title: {
    paddingLeft: 16,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20,
  },
  date: {
    paddingLeft: 16,
    fontSize: 18,
    color: "gray",
    marginBottom: 16,
  },
  description: {
    paddingLeft: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    paddingLeft: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionTitle2: {
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  organizerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  organizerName: {
    fontSize: 16,
    marginRight: 8,
  },
  contact: {
    fontSize: 16,
    color: "gray",
  },
  location: {
    fontSize: 16,
    color: "#007BFF",
  },
  attendeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  moreAttendees: {
    marginTop: 8,
    color: "#007BFF",
  },
  nearbyEvents: {
    marginTop: 16,
  },
  eventCard: {
    width: "90%",
    height: 180,
    alignSelf: "center",
    backgroundColor: "#8A2BE2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  eventCardText: {
    fontSize: 16,
    color: "white",
    marginBottom: 4,
  },
  eventCardDate: {
    fontSize: 14,
    color: "white",
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonParticipar: {
    width: "90%",
    height: 60,
    marginTop: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#4090fe",
    padding: 18,
    marginBottom: 20,
  },
});
