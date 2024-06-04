import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home/Home";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ContentIcon, TextIcon } from "./Style";
import { Map } from "../../components/Logo/Map/Map";
import { Login } from "../Login/Login";
import { Like } from "../Like/Like";
import { Calendar } from "../../components/Calendar/Calendar";

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
          const iconColor = focused? "#FEA340" : "#AAAAAA"; // Cor original

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
          } else if (route.name === "Calendar") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Feather name="calendar" size={28} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Eventos</TextIcon>
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
          } else if (route.name === "Like") {
            return (
              <ContentIcon
                tabBarActiveBackgroundColor={
                  focused? "#fff" : "transparent"
                }
              >
                <Feather name="heart" size={32} color={iconColor} />
                {focused && (
                  <TextIcon style={{ paddingLeft: 3 }}>Like</TextIcon>
                )}
              </ContentIcon>
            );
          }
        },
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Map" component={Map} />
      <BottomTab.Screen name="Calendar" component={Calendar} />
      <BottomTab.Screen name="Login" component={Login} />
      <BottomTab.Screen name="Like" component={Like} />
    </BottomTab.Navigator>
  );
};
