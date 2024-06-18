import React, { useEffect,  useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
//import components
import splashjson from "./SplashFest.json";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ProgressBarAndroid,
  StatusBar,
} from "react-native";


export const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Define isLoading como false após 3 segundos (3000 milissegundos)
      navigation.navigate("Onboarding1");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
      <View style={styles.container}>
          <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={"transparent"} />
          {/* <Logo/> */}

          {/* Exibe a animação de splash */}
          <LottieView
              source={splashjson}
              autoPlay
              loop={false}
              resizeMode="contain"
              style={styles.animation}
              onAnimationFinish={() => setIsLoading(false)} // Define isLoading como false quando a animação terminar
          />
          <Text style={styles.txt}>Centralize todos os seus eventos em um único lugar!</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  animation: {
    width: "100%",
    height: "50%", // Reduz a altura da animação para deixar espaço para a barra de carregamento
  },
  loader: {
    marginTop: 10, // Adiciona margem superior à barra de carregamento
  },
  txt: {
    color: "#60BFC5",
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
    textAlign: "center",
    width: "70%",
  },
});
