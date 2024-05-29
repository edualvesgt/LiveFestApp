import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
//import components
import splashjson from "./SplashFest.json";
import { Logo } from "../../components/Logo/Logo";

//import bibliotecas
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ProgressBarAndroid,
} from "react-native";

export const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Define isLoading como false após 3 segundos (3000 milissegundos)
      navigation.navigate("Home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
      <View style={styles.container}>
          <Logo/>

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
