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
import { CreateAccount, Register } from "./src/screens/CreateAccount/CreateAccount";
import { RegistrationSuccessful } from "./src/screens/RegistrationSuccessful/RegistrationSuccessful";
import { PasswordRecover } from "./src/screens/PasswordRecover/PasswordRecover";
import { EmailVerification } from "./src/screens/EmailVerification/EmailVerification";
import { PasswordResetSuccessful } from "./src/screens/PasswordResetSuccessful/PasswordResetSuccessful";
import VerificationCode from "./src/screens/VerificationCode/VerificationCode";
import { PasswordReset } from "./src/screens/PasswordReset/PasswordReset";
import { Login } from "./src/screens/Login/Login";


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
      <StatusBar />
      <Stack.Navigator
        initialRouteName="SplashScreen" // Define a tela inicial do navegador de pilha.
        screenOptions={{
          headerShown: false,             // Oculta o cabeçalho padrão de todas as telas dentro do navegador de pilha.
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
          // gestureEnabled: false
        }}
      // screenOptions={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push'}} // Oculta o cabeçalho padrão de todas as telas dentro do navegador de pilha.
      >
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
          name="DetailedCard"
          component={DetailedCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          //Login
          name='Login'
          //componente que sera chamado
          component={Login}
          //titulo da tela
          options={{ title: 'Login' }}
        />
          <Stack.Screen
          //RegistrationSuccessful
          name='PasswordReset'
          //componente que sera chamado
          component={PasswordReset}
          //titulo da tela
          options={{title: 'PasswordReset'}}
        />
          <Stack.Screen
          //RegistrationSuccessful
          name='EmailVerification'
          //componente que sera chamado
          component={EmailVerification}
          //titulo da tela
          options={{
            title: 'EmailVerification',
            // animation:'slide_from_right',
          }}
        />
           <Stack.Screen
          //RegistrationSuccessful
          name='VerificationCode'
          //componente que sera chamado
          component={VerificationCode}
          //titulo da tela
          options={{
            title: 'VerificationCode',
            animation:'slide_from_right',
          }}    
        />
         <Stack.Screen
          //Login
          name='CreateAccount'
          //componente que sera chamado
          component={CreateAccount}
          //titulo da tela
          options={{ title: 'CreateAccount' }}
        />
        <Stack.Screen
          //RegistrationSuccessful
          name='RegistrationSuccessful'
          //componente que sera chamado
          component={RegistrationSuccessful}
          //titulo da tela
          options={{ title: 'RegistrationSuccessful' }}
        />
         <Stack.Screen
          //RegistrationSuccessful
          name='PasswordRecover'
          //componente que sera chamado
          component={PasswordRecover}
          //titulo da tela
          options={{title: 'PasswordRecover'}}
        />
       
         <Stack.Screen
          //RegistrationSuccessful
          name='PasswordResetSuccessful'
          //componente que sera chamado
          component={PasswordResetSuccessful}
          //titulo da tela
          options={{title: 'PasswordResetSuccessful'}}
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
