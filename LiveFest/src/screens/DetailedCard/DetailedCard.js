import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { TextButtonDefault } from "../../components/Texts/Texts";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import api from "../../service/service";
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'

const mapApiDataToEventData = (apiData) => {
  return {
    id: apiData.id,  // Ensure the ID is included in the mapped data
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

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
})

export const DetailedCard = ({
  route,
  navigation
}) => {

  const [eventFav, setEventFav] = useState(null)

  const [eventData, setEventData] = useState(null);
  // const route = useRoute();
  // const navigation = useNavigation();
  const [eventId,setEventId] = useState(null)
  const [favoriteEvent, setFavoriteEvent] = useState(null)
  
  useEffect(()=>{
    setEventId(route.params?.dataCard)
  },[]) 
  
  useEffect(() => {
    console.log(eventId)
    if (eventId) {
      fetchEventData(eventId);
    }
  }, [eventId]);

  useFocusEffect(
    useCallback(() => {      
        fetchEventFav();
    }, [eventData,eventFav])
  );

  const fetchEventData = async (eventId) => {
    // console.log(eventId)
    try {
      const response = await api.get(`/Events/GetById?id=${eventId}`);
      const data = response.data;
      // console.log("Dados do evento da API:", data);

      const location = await fetchEventLocation(data.addressID);
      // console.log("Dados de localização:", location);

      const eventData = {
        ...mapApiDataToEventData(data),
        ...location,
      };
      // console.log("Dados do evento mapeados:", eventData);

      setEventData(eventData);
      // console.log("Dados Events : ", eventData)
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
        locationData
      };
    } catch (error) {
      console.error("Erro ao carregar dados de localização:", error);
      return { latitude: null, longitude: null };
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      await api.delete(`/SaveEvents/Delete?userID=${userId}&eventID=${eventId}`);
      // Atualiza a lista de favoritos após deletar
      // setFavorites(favorites.filter((item) => item.id !== eventId));
      setEventFav(false)
      handleCallNotifications()
    } catch (error) {
      console.error('Error deleting favorite event', error);
    }
  };

  // const fetchEventFav = async () => {
  //   console.log("execultou")
  //   const userId = await AsyncStorage.getItem('@userId');
  //   if (!userId) {
  //     Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
  //     return;
  //   }

  //   await api.get(`/SaveEvents/All?userID=${userId}`)
  //   .then( (response) => {
  //     console.log('Obtendo os Favoritos: ',response.data)
  //     const eventoEncontrado = favoritos.some(evento => evento.events.id === eventData?.id);
     
  //     if (eventoEncontrado) {
  //       const favorite = favoritos.find(evento => evento.events.id === eventData.id);
  //       setFavoriteEvent(favorite.eventsID);
  //       setEventFav(true);
  //       console.log("setEventFav salvo como true")
  //     } else {
  //       console.log("setEventFav salvo como false")
  //       setEventFav(false);
  //     }
  //   }     
  //   ).catch(
  //     console.log(erro)
  //   )
  // }

  const fetchEventFav = async () => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      const response = await api.get(`/SaveEvents/All?userID=${userId}`);
      const favoritos = response.data;

      if (eventData) {
        const eventoEncontrado = favoritos.some(evento => evento.events.id === eventData.id);
        if (eventoEncontrado) {
          console.log("Valor encontrado")
          const favorite = favoritos.find(evento => evento.events.id === eventData.id);
          setFavoriteEvent(favorite.eventsID);
          setEventFav(true);
        } else {
          console.log("Valor nao encontrado")
          setEventFav(false);
        }
      }
    } catch (error) {
      console.error("Erro ao obter favoritos:", error);
    }
  };

  const handleSaveEvent = async () => {
    try {
      const userId = await AsyncStorage.getItem('@userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
        return;
      }

      await api.post('/SaveEvents/Create', {
        userID: userId,
        eventID: eventData.id,
      });
      // Alert.alert('Sucesso', 'Evento salvo com sucesso!');
      setEventFav(true)
      handleCallNotificationsOk()
    } catch (error) {
      console.error('Erro ao salvar evento', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o evento.');
    }
  };

  if (!eventData) {
    return <Text>Carregando...</Text>;
  }

  const openMaps = () => {
    navigation.navigate("Map", {
      latitudeEvento: eventData.locationData.latitude,
      longitudeEvento: eventData.locationData.longitude,
      nomeEvento: eventData.event_name,
      dataEvento: eventData.event_date,
      descricaoEvento: eventData.description,
    });
  };

  const navigateHome = () => {
    // navigation.navigate("Favorites", { event: eventData }); // Passando o evento como parâmetro
    navigation.navigate("Main")
  };



  const handleCallNotifications = async () => {
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
        body: `O envento "${eventData.event_name}" foi cancelado com sucesso.`
      },
      trigger: null
    })
  }
  const handleCallNotificationsOk = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      alert('Você não habilitou, receber notificação no app.');
      return;
    }

    // const token = await Notifications.getExpoPushTokenAsync();
    // console.log(token)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Evento registrado',
        body: `O envento "${eventData.event_name}" foi registrado com sucesso.`
      },
      trigger: null
    })
  }




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
          {/* <Text style={styles.headerSubtitle}>7 eventos</Text> */}
        </ImageBackground>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{eventData.event_name}</Text>
        <Text
          style={styles.date}
        >{`${eventData.event_date}, ${eventData.event_time}`}</Text>
        <Text style={styles.description}>{eventData.description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organizado por</Text>
          <View style={styles.organizerInfo}>
            <Text style={styles.organizerName}>{eventData.organizer.name}</Text>
          </View>
          <Text style={styles.contact}>{eventData.organizer.contact}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <TouchableOpacity onPress={openMaps}>
            <Text style={styles.location}>
              {eventData.locationData.name} - {eventData.locationData.street}, {eventData.locationData.number}
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

        {
          (eventFav === false) ? 
            <TouchableOpacity
              style={styles.buttonParticipar}
              onPress={()=>{                
                handleSaveEvent()
                }}  // Call the handleSaveEvent function
            >
              <TextButtonDefault>Favoritar</TextButtonDefault>
            </TouchableOpacity>            
          :
          <TouchableOpacity
              style={[styles.buttonParticipar, { backgroundColor: "red" }]}
              onPress={()=>{                
                handleDelete(favoriteEvent)
              }}  // Call the handleSaveEvent function
            >
              <TextButtonDefault>Remover dos Favoritos</TextButtonDefault>
            </TouchableOpacity>
            
        }
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
    paddingRight: 12,
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
    fontSize: 16,
    color: "#007BFF",
  },
  nearbyEvents: {
    paddingLeft: 16,
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
    width: 20,
    height: 20,
  },
});


