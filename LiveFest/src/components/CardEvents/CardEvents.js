import { Text, View } from "react-native"
import { ContainerCardEvents } from "./Style"
import { TextContentCard, TextTimeCard, TextTitleCard } from "../Texts/Texts"

export const CardEvents = ({
  titleEvent,
  time,
  description
}) => {
  return (
    <ContainerCardEvents>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextTitleCard
          numberOfLines={1}
        >
          {titleEvent}
        </TextTitleCard>
        <TextTimeCard>
          {time}
        </TextTimeCard>
      </View>
      <View>
        <TextContentCard
          numberOfLines={2}
        >
          {description}
        </TextContentCard>
      </View>
    </ContainerCardEvents>
  )
}