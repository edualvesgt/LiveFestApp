import { FlatList } from "react-native"
import { CardEvents } from "../CardEvents/CardEvents"

export const ListCardsEvents = ({
  cards
}) => {
  return (
    <>
      <FlatList
        data={cards}
        renderItem={({ item }) =>
          (
            <CardEvents
              titleEvent={item.title}
              description={item.description}
              time={item.time}
            />
            
          )

        }
        keyExtractor={item => item.id}
        style={{
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}        
      />
    </>
  )
}