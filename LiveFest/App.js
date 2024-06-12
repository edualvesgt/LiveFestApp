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
import { PasswordRecover } from "./src/screens/PasswordRecover/PasswordRecover";
import { EmailVerification } from "./src/screens/EmailVerification/EmailVerification";
import { PasswordResetSuccessful } from "./src/screens/PasswordResetSuccessful/PasswordResetSuccessful";
import VerificationCode from "./src/screens/VerificationCode/VerificationCode";
import { PasswordReset } from "./src/screens/PasswordReset/PasswordReset";


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
      screenOptions={{ headerShown: false,             // Oculta o cabeçalho padrão de todas as telas dentro do navegador de pilha.
                       animation: 'slide_from_right', 
                       animationTypeForReplace: 'push', 
                        // gestureEnabled: false
                      }} 
      // screenOptions={{ headerShown: false, animation: 'fade', animationTypeForReplace: 'push'}} // Oculta o cabeçalho padrão de todas as telas dentro do navegador de pilha.
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


