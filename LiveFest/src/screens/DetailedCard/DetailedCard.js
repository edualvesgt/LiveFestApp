import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"; // Importe a biblioteca de ícones
import ButtonDefault from "../../components/ButtonDefault/ButtonDefault";
import { TextButtonDefault } from "../../components/Texts/Texts";

export const DetailedCard = ({ route }) => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation(); // Use o hook de navegação

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const data = await getMockEventData();
      console.log(data);
      setEventData(data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const getMockEventData = async () => {
    return new Promise((resolve) => {
      resolve({
        event_name: "Metallica Concert",
        event_date: "Seg, 25 de Março",
        event_time: "09:59PM",
        description:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
        organizer: {
          name: "John Wells",
          contact: "702-323-3322",
        },
        location: "05 Frami Mills Apt. 295",
        attendees: [
          "https://randomuser.me/api/portraits/men/1.jpg",
          "https://randomuser.me/api/portraits/women/2.jpg",
        ],
        contact: {
          phone: "473-465-1548",
          email: "lakin_gavin@yahoo.com",
        },
      });
    });
  };

  if (!eventData) {
    return <Text>Carregando...</Text>;
  }

  const openMaps = () => {
    navigation.navigate("Map", {
      latitudeEvento: -23.448563,
      longitudeEvento: -46.534352,
      nomeClinica: "Metallica Concert",
    });
  };

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../../../assets/Group 4.png")}
          style={styles.header}
        >
          <TouchableOpacity onPress={navigateHome} style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agenda de Eventos</Text>
          <Text style={styles.headerSubtitle}>7 eventos</Text>
        </ImageBackground>
        <Text style={styles.title}>{eventData.event_name}</Text>
        <Text
          style={styles.date}
        >{`${eventData.event_date}, ${eventData.event_time}`}</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organizado por</Text>
          <View style={styles.organizerInfo}>
            <Text style={styles.organizerName}>{eventData.organizer.name}</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Seguir</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.contact}>{eventData.organizer.contact}</Text>
        </View>

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
  onPress={() =>
    navigation.navigate("Favorite", {
      title: eventData.event_name,
      date: `${eventData.event_date}, ${eventData.event_time}`,
      color: '#8A2BE2', 
    })
  }
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
  header: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
  followButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  followButtonText: {
    color: "white",
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
    width: "100%",
    alignSelf: 'center',
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
  floatingButton: {
    position: "absolute",
    bottom: 90,
    right: 16,
    backgroundColor: "red",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 24,
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
    alignSelf: 'center',
    backgroundColor: "#4090fe",
    padding: 18,
    marginBottom: 20,
  },
});
