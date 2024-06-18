import { Image, TouchableOpacity, View } from "react-native"
import { CardMainContianer } from "./style"
import { TextDate, TextTitleCardMain } from "../Texts/Texts"
import moment from "moment"
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export const CardsMainEvents = ({
  title,
  date,
  urifoto,
  onPress,
  navigation,
}) => {

  const [favorite, setFavorite] = useState(false);

  return (
    // <TouchableOpacity
    //  onPress={
    //   ()=>{
    //     navigation.replace("DetailedCard")
    //   }
    //  }
    // >
      <CardMainContianer>
        <Image source={{ uri: urifoto }} style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 6 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            width: 317,
            backgroundColor: "#00000080",
            borderRadius: 6,
            paddingHorizontal: 15,
            paddingVertical: 10
          }}>
          <View style={{ gap: 5, width: "80%" }}>
            <TextTitleCardMain
              numberOfLines={1}
            >
              {title}
            </TextTitleCardMain>
            <TextDate>{moment(date).format("DD-MM-YYYY")}</TextDate>
          </View>
          {/* <TouchableOpacity 
          onPress={()=> setFavorite(!favorite)}
        >
        {
          favorite? 
          <Ionicons
            name="star"
            size={24}
            color={"yellow"}
          />
          :
          <AntDesign name="staro" size={24} color="white"/>
        }
        </TouchableOpacity> */}
        </View>
      </CardMainContianer>
    // </TouchableOpacity>
  )
}