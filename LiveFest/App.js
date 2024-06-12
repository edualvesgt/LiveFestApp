import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "./src/screens/Splash/Splash";

// Importe das Fontes
import {
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";

import {
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { Home } from "./src/screens/Home/Home";
import { Onboarding1 } from "./src/screens/Onboarding1/Onboarding1";
import { Onboarding2 } from "./src/screens/Onboarding2/Onboarding2";
import { Onboarding3 } from "./src/screens/Onboarding3/Onboarding3";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./src/screens/Main/Main";
import { Categories } from "./src/screens/Categories/Categories";
import { DetailedCard } from "./src/screens/DetailedCard/DetailedCard";
import { Map } from "./src/components/Map/Map";
import { Favorites } from "./src/screens/Favorites/Favorites";
import { SelectedCategory } from "./src/screens/SelectedCategory/SelectedCategory";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        MontserratAlternates_600SemiBold,
        MontserratAlternates_500Medium,
        MontserratAlternates_700Bold,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Map"
                    component={Map}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectedCategory"
                    component={SelectedCategory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DetailedCard"
                    component={DetailedCard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Favorites"
                    component={Favorites}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
