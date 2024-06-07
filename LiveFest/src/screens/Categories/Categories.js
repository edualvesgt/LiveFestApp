import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ContainerMarginStatusBar } from "../../components/Container/Style";
import { StatusBar } from "expo-status-bar";
import { TextTitle } from '../../components/Texts/Texts';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const categories = [
  { id: '1', title: 'Congressos e Palestras', events: 32, color: '#4DB6E8' },
  { id: '2', title: 'Arte, Cinema e Lazer', events: 10, color: '#FF8A65' },
  { id: '3', title: 'Saúde e Bem-Estar', events: 60, color: '#BA68C8' },
  { id: '4', title: 'Infantil', events: 7, color: '#F06292' },
  { id: '5', title: 'Games e Geek', events: 20, color: '#81C784' },
  { id: '6', title: 'Esportes', events: 25, color: '#FFD54F' },
  { id: '7', title: 'Música e Shows', events: 15, color: '#4DB6AC' },
  { id: '8', title: 'Tecnologia', events: 12, color: '#7986CB' },
  { id: '9', title: 'Negócios e Finanças', events: 18, color: '#FF7043' },
  { id: '10', title: 'Gastronomia', events: 22, color: '#8D6E63' },
  { id: '11', title: 'Turismo e Viagens', events: 8, color: '#AED581' },
  { id: '12', title: 'Educação', events: 40, color: '#64B5F6' },
];

const CategoryItem = ({ title, events, color }) => (
  <TouchableOpacity style={[styles.categoryContainer, { backgroundColor: color }]}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <Text style={styles.categoryEvents}>{events} eventos</Text>
  </TouchableOpacity>
);

export const Categories = () => {
  const navigation = useNavigation();

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
   marginLeft: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 28,
  },
  categoryContainer: {
    padding: 24,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    height: 120,
    alignItems: 'center'
    
  },
  categoryTitle: {
    fontSize: 24,
    color: '#fff',
    fontFamily: "Raleway_700Bold"
  },
  categoryEvents: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "Raleway_700Bold"
  },
  ContainerImput: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});
