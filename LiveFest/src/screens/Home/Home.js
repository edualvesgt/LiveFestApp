import { SafeAreaView, StatusBar, StyleSheet, TextInput } from "react-native"
import ButtonDefault from "../../components/ButtonDefault/ButtonDefault"
import { TextTitle } from "../../components/Titles/Titles"
import InputSearch from "../../components/InputSearch/InputSearch"
import InputSearchTest from "../../components/InputSearchTest/InputSearchTest"
import { useState } from "react"
import { ModalTeste } from "../../components/Modal/ModalTeste"

export const Home = ({ navigation }) => {

  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');
    return(
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"}/>
      <TextTitle>Fixou uma data para o evento</TextTitle>
      <ButtonDefault text={"Iniciar"}/>
      <InputSearchTest />

      

      <TextInput placeholder="dsadsad"></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      {/* <InputSearch/> */}


      <ModalTeste />
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
