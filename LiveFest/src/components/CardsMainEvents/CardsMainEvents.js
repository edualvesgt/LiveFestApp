import { Image, View } from "react-native"
import { CardMainContianer } from "./Style"
import { TextDate, TextTitleCardMain } from "../Texts/Texts"

import { AntDesign } from '@expo/vector-icons';

export const CardsMainEvents = ({
  title,
  date,
  urifoto
}) => {
  return (


    <CardMainContianer>
      <Image source={{ uri: urifoto }} style={{ width: "100%", height: "100%", resizeMode:"cover", borderRadius: 6}} />
      <View 
        style={{
            flexDirection: "row", 
            justifyContent:"space-between", 
            alignItems: "center",
            position: "absolute", 
            bottom: 0, 
            width:317,
            backgroundColor: "#00000080",
            borderRadius: 6, 
            paddingHorizontal: 15,
            paddingVertical: 10
      }}>
        <View style={{ gap: 5}}>
          <TextTitleCardMain>{title}</TextTitleCardMain>
          <TextDate>{date}</TextDate>
        </View>
        <AntDesign name="staro" size={24} color="white" />
      </View>
    </CardMainContianer>
  )
}