import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home/Home";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ContentIcon, TextIcon } from "./Style";
import { Login } from "../Login/Login";
import Map from "../../components/Map/Map";
import { Categories } from "../Categories/Categories";
import { Entypo } from '@expo/vector-icons';
import { Favorites } from "../Favorites/Favorites";

const BottomTab = createBottomTabNavigator();

export const Main = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#FFFFFF", height: 60 },
        tabBarActiveBackgroundColor: "transparent",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          // Ajuste aqui para mudar a cor dos ícones para #FEA340 quando focados
          const iconColor = focused? "#956ADF" : "#AAAAAA"; // Cor original

          if (route.name === "Home") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <AntDesign name="home" size={32} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Home</TextIcon>
                )}
              </ContentIcon>
            );
          } else if (route.name === "Map") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Feather name="map" size={28} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Mapa</TextIcon>
                )}
              </ContentIcon>
            );
          } else if (route.name === "Categories") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Entypo name="menu" size={38} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Categoria</TextIcon>
                )}
              </ContentIcon>
            );
          } else if (route.name === "Login") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Feather name="user" size={32} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Login</TextIcon>
                )}
              </ContentIcon>
            );
          } else if (route.name === "Favorites") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Feather name="heart" size={32} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Favoritos</TextIcon>
                )}
              </ContentIcon>
            );
          }
        },
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Map" component={Map} />
      <BottomTab.Screen name="Categories" component={Categories} />
      <BottomTab.Screen name="Login" component={Login} />
      <BottomTab.Screen name="Favorites" component={Favorites} />
    </BottomTab.Navigator>
  );
};
