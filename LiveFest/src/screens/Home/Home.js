import { StatusBar } from "react-native"
import ButtonDefault from "../../components/ButtonDefault/ButtonDefault"
import { TextTitle } from "../../components/Titles/Titles"
import InputSearch from "../../components/InputSearch/InputSearch"



export const Home = ({ navigation }) => {
    return(<>

      <StatusBar/>
      <TextTitle>Fixou uma data para o evento</TextTitle>
      <ButtonDefault text={"Iniciar"}/>

      <InputSearch/>
      
    </>
    )
}