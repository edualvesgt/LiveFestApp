import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from '../../components/Texts/Texts';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import api from "../../service/service";

const colors = [
  '#4DB6E8', '#FF8A65', '#BA68C8', '#F06292', '#81C784', '#FFD54F', 
  '#4DB6AC', '#7986CB', '#FF7043', '#8D6E63', '#AED581', '#64B5F6'
];

const EventItem = ({ title, date, description, color, onPress  }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (description, limit) => {
    const words = description.split(" ");
    if (words.length > limit) {
      return `${words.slice(0, limit).join(" ")} ...`;
    } else {
      return description;
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <View style={[styles.eventContainer, { borderColor: color }]}>
      <Text style={[styles.eventTitle, { color }]}>{title}</Text>
      <Text style={styles.eventDate}>{new Date(date).toLocaleDateString()}</Text>
      <Text style={styles.eventDescription}>
        {showFullDescription ? description : truncateDescription(description, 20)}
      </Text>
      {description.split(" ").length > 20 && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.showMoreText}>
            {showFullDescription ? "Ver menos" : "Ver mais"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const SelectedCategory = () => {
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = route.params;

  useEffect(() => {
    if (categoryId) {
      fetchEventsData(categoryId);
    }
  }, [categoryId]);

  const fetchEventsData = async (categoryId) => {
    try {
      const response = await api.get(`/Events/GetByCategory?CategoriesID=${categoryId}`);
      const data = response.data;

      const mappedEvents = data.map((item, index) => ({
        id: item.id,
        title: item.eventName,
        date: item.date,
        description: item.description,
        color: colors[index % colors.length], // Usando cores de maneira cíclica
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Erro ao carregar dados dos eventos:", error);
    }
  };

  return (
    <>
      <ContainerMarginStatusBar justifyContent={"start"}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="close" size={30} color="#D75353" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <TextTitle>Lista dos Eventos</TextTitle>
          </View>
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem 
              title={item.title} 
              date={item.date} 
              description={item.description} 
              color={item.color}
              onPress={() => navigation.navigate("DetailedCard", { eventData: item })}
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
  eventContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: "MontserratAlternates_500Medium",
  },
  eventDate: {
    fontSize: 16,
    fontFamily: "MontserratAlternates_400Regular",
    marginTop: 4,
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: "MontserratAlternates_400Regular",
  },
  showMoreText: {
    color: "#007BFF",
    marginTop: 5,
    fontFamily: "MontserratAlternates_400Regular",
    marginBottom: 20,
  },
});
