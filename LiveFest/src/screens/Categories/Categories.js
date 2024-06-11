import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from '../../components/Texts/Texts';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import api from "../../service/service";

const colors = [
  '#4DB6E8', '#FF8A65', '#BA68C8', '#F06292', '#81C784', '#FFD54F', 
  '#4DB6AC', '#7986CB', '#FF7043', '#8D6E63', '#AED581', '#64B5F6'
];

const CategoryItem = ({ title, events, color }) => (
  <TouchableOpacity style={[styles.categoryContainer, { backgroundColor: color }]}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <Text style={styles.categoryEvents}>{events} eventos</Text>
  </TouchableOpacity>
);

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const response = await api.get('/categories');
      const data = response.data;

      // Mapear os dados da API para o formato necessário
      const mappedCategories = data.map((item, index) => ({
        id: item.id,
        title: item.category,
        events: Math.floor(Math.random() * 100), // Gerando um número aleatório para eventos
        color: colors[index % colors.length], // Usando cores de maneira cíclica
      }));

      setCategories(mappedCategories);
    } catch (error) {
      console.error("Erro ao carregar dados das categorias:", error);
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
            <TextTitle>Categorias</TextTitle>
          </View>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem title={item.title} events={item.events} color={item.color} />
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
  categoryContainer: {
    padding: 24,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    height: 120,
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "MontserratAlternates_500Medium",
  },
  categoryEvents: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "MontserratAlternates_500Medium",
  },
});
