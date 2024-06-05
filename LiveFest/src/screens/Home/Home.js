import { SafeAreaView, StatusBar, StyleSheet, TextInput, View } from "react-native"
import ButtonDefault from "../../components/ButtonDefault/ButtonDefault"
import { TextTitle } from "../../components/Texts/Texts"
import InputSearch from "../../components/InputSearch/InputSearch"
import { useState } from "react"
import { ModalTeste } from "../../components/Modal/ModalTeste"
import { CardsMainEvents } from "../../components/CardsMainEvents/CardsMainEvents"
import Carrosel from "../../components/Carrosel/Carrosel"
import { CardEvents } from "../../components/CardEvents/CardEvents"

export const Home = ({ navigation }) => {
  const cardsMain = [
    {
      title: "Startup Event",
      urifoto: "https://www.omnieventos.com/wp-content/uploads/2018/06/eventos-corporativos-1000x500.jpg",
      date: "01/06/2024"
    },
    {
      title: "Startup Event",
      urifoto: "https://conectanuvem.com.br/wp-content/uploads/2022/11/Capas-Blog-Imagem-destacadas-2022-44-930x620.png",
      date: "01/06/2024"
    }
  ]

  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  return (
    <SafeAreaView style={{height:"100%", backgroundColor:"green"}}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{backgroundColor:"yellow"}} >
        <TextTitle >Fixou uma data para o evento</TextTitle>
        <InputSearch />
      </View>
      <View >
        <Carrosel cardsMain={cardsMain} />
      </View>
      
      {/* <CardEvents /> */}
      <View style={{backgroundColor:"yellow", padding:1}}>
        <ButtonDefault text={"Iniciar"} />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
