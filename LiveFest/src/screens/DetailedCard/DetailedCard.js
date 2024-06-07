import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Linking, ImageBackground } from 'react-native';

export const DetailedCard = ({ route }) => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Simula uma chamada à API com dados mock para testes
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      // Substitua pela chamada real da API 
      const data = await getMockEventData();
      console.log(data); 
      setEventData(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const getMockEventData = async () => {
    // Dados mock para testes
    return new Promise((resolve) => {
      resolve({
        event_name: 'Metallica Concert',
        event_date: 'Seg, 25 de Março',
        event_time: '09:59PM',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        organizer: {
          name: 'John Wells',
          contact: '702-323-3322'
        },
        location: '05 Frami Mills Apt. 295',
        attendees: [
          'https://randomuser.me/api/portraits/men/1.jpg',
          'https://randomuser.me/api/portraits/women/2.jpg',
          
        ],
        contact: {
          phone: '473-465-1548',
          email: 'lakin_gavin@yahoo.com'
        }
      });
    });
  };

  if (!eventData) {
    return <Text>Carregando...</Text>; 
  }

  const openMaps = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventData.location)}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../../assets/Group 4.png')} 
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Agenda de Eventos</Text>
        <Text style={styles.headerSubtitle}>7 eventos</Text>
      </ImageBackground>
      <Text style={styles.title}>{eventData.event_name}</Text>
      <Text style={styles.date}>{`${eventData.event_date}, ${eventData.event_time}`}</Text>
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
          <Text style={styles.location}>{eventData.location}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pessoas presentes</Text>
        <FlatList
          data={eventData.attendees}
          horizontal
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.attendeeImage} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity>
          <Text style={styles.moreAttendees}>+6 More people are attending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.contact}>{eventData.contact.phone}</Text>
        <Text style={styles.contact}>{eventData.contact.email}</Text>
      </View>

      <View style={styles.nearbyEvents}>
        <Text style={styles.sectionTitle}>Eventos perto de você</Text>
        <TouchableOpacity style={styles.eventCard}>
          <Text style={styles.eventCardText}>Moda e Beleza</Text>
          <Text style={styles.eventCardDate}>09 Jun 2018</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white', 
  },
  header: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0', 
    padding: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerName: {
    fontSize: 16,
    marginRight: 8,
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  followButtonText: {
    color: 'white',
  },
  contact: {
    fontSize: 16,
    color: 'gray',
  },
  location: {
    fontSize: 16,
    color: '#007BFF',
  },
  attendeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  moreAttendees: {
    marginTop: 8,
    color: '#007BFF',
  },
  nearbyEvents: {
    marginTop: 16,
  },
  eventCard: {
    backgroundColor: '#8A2BE2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  eventCardText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  eventCardDate: {
    fontSize: 14,
    color: 'white',
  },
});


