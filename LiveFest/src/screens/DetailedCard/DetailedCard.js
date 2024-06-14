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
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextButtonDefault } from "../../components/Texts/Texts";
import api from "../../service/service";
import { FontAwesome } from '@expo/vector-icons';

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
      name: apiData.organizer || "Organizador não fornecida",
      contact: apiData.phoneNumber,
    },
    location: apiData.address || "Localização não fornecida",
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
  const eventId = route.params.eventData?.id;

  useEffect(() => {
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  const fetchEventData = async (eventId) => {
    try {
      const response = await api.get(`/Events/GetById?id=${eventId}`);
      const data = response.data;
      console.log("Dados do evento da API:", data);

      const location = await fetchEventLocation(data.addressID);
      console.log("Dados de localização:", location);

      const eventData = {
        ...mapApiDataToEventData(data),
        ...location,
      };
      console.log("Dados do evento mapeados:", eventData);

      setEventData(eventData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", "Ocorreu um erro ao carregar os dados do evento.");
    }
  };

  const fetchEventLocation = async (addressID) => {
    try {
      const response = await api.get(`/Address/GetById?id=${addressID}`);
      const locationData = response.data;
      return {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      };
    } catch (error) {
      console.error("Erro ao carregar dados de localização:", error);
      return { latitude: null, longitude: null };
    }
  };

  const openMaps = () => {
    console.log("Dados do evento no openMaps:", eventData);
    if (eventData.latitude && eventData.longitude) {
      navigation.navigate("Map", {
        latitudeEvento: eventData.latitude,
        longitudeEvento: eventData.longitude,
        nomeEvento: eventData.event_name,
        dataEvento: eventData.event_date,
        descricaoEvento: eventData.description,
      });
    } else {
      Alert.alert("Erro", "A localização do evento não está disponível.");
    }
  };

  const navigateHome = () => {
    navigation.navigate("Favorites", { event: eventData });
  };

  if (!eventData) {
    return <Text>Carregando...</Text>;
  }

  // async function GetByEvent() {
  //   try {
  //     const response = await api.get(`/Evaluations/GetByEvent?id=${eventId}`);

  //     setEvaluation(response.description);
  //   } catch (error) {
  //     console.log("deu ruim na requição de comentário");
  //     console.log(error.request);
  //   }
  // }

  // useEffect(() => {
  //   if (eventId) {
  //     GetByEvent();
  //   }
  // }, [eventId]);

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
        <Text
          style={styles.date}
        >{`${eventData.event_date}, ${eventData.event_time}`}</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        {eventData.organizer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Organizado por</Text>
            <View style={styles.organizerInfo}>
              <Text style={styles.organizerName}>
                {eventData.organizer.name}
              </Text>
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
          <Text>Latitude: {eventData.latitude}</Text>
          <Text>Longitude: {eventData.longitude}</Text>
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

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comentários do Evento</Text>
          <View style={styles.eventEvaluation}>
            <View style={styles.organizerInfo}>
              <View style={styles.userIcon}>
                <FontAwesome name="user" size={24} color="black" />
              </View>
              <Text style={styles.sectionTitle3}>Leandro Gonçalves</Text>
            </View>
            <Text style={styles.eventEText}>{evaluation}
            </Text>
          </View>
        </View> */}

        {/* <View style={styles.evaluationSection}>
          <TextInput
            style={styles.eventE}
            placeholder="Escreva o seu comentário"
            keyboardType="text">
          </TextInput>
          <TouchableOpacity style={styles.sendEvaluation}>
            <FontAwesome name="send" size={24} color="white" />
          </TouchableOpacity>
        </View> */}

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
  evaluationSection: {
    paddingLeft: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    gap: 8,
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
  sectionTitle3: {
    fontSize: 18,
    fontWeight: "bold"
  },
  organizerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  organizerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10
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
    fontSize: 16,
    color: "#007BFF",
  },
  nearbyEvents: {
    paddingLeft: 16,
  },
  eventEvaluation: {
    width: "90%",
    marginRight: 10,
    height: 180,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#4090fe",
    borderWidth: 2
  },
  // sendEvaluation: {
  //   marginTop: 5,
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100,
  //   backgroundColor: "#4090fe",
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  userIcon: {
    marginTop: 5,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#c6c6c6",
    justifyContent: "center",
    alignItems: "center"
  },
  eventE: {
    width: "75%",
    marginLeft: 15,
    height: 60,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#4090fe",
    borderWidth: 2
  },
  eventCard: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  eventCardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventEText: {
    fontSize: 16,
    color: "black",
    marginBottom: 4,
  },
  eventCardDate: {
    fontSize: 14,
    color: "gray",
  },
  buttonParticipar: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
