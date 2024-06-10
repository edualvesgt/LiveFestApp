import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./src/screens/Home/Home";
import { SplashScreen } from "./src/screens/Splash/Splash";
import { Login } from "./src/screens/Login/Login";
import { Navigation } from "./src/screens/Navigation/Navigation";
import { StatusBar } from 'expo-status-bar';




// Importe das Fontes
import {
  useFonts,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_500Medium,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import { CreateAccount, Register } from "./src/screens/CreateAccount/CreateAccount";
import { RegistrationSuccessful } from "./src/screens/RegistrationSuccessful/RegistrationSuccessful";


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
     <StatusBar/>
     <Stack.Navigator 
      initialRouteName="SplashScreen" // Define a tela inicial do navegador de pilha.
      screenOptions={{ headerShown: false }} // Oculta o cabeçalho padrão de todas as telas dentro do navegador de pilha.
    >
        {/* <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Navigation"
          component={Navigation}
          options={{ headerShown: false }}
        />

         <Stack.Screen
          //Login
          name='Login'
          //componente que sera chamado
          component={Login}
          //titulo da tela
          options={{title: 'Login'}}
        />
         <Stack.Screen
          //Login
          name='CreateAccount'
          //componente que sera chamado
          component={CreateAccount}
          //titulo da tela
          options={{title: 'CreateAccount'}}
        />
         <Stack.Screen
          //RegistrationSuccessful
          name='RegistrationSuccessful'
          //componente que sera chamado
          component={RegistrationSuccessful}
          //titulo da tela
          options={{title: 'RegistrationSuccessful'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


