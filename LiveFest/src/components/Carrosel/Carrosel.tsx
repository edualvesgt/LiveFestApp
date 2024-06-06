import React, { useRef } from "react";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { CardsMainEvents } from "../CardsMainEvents/CardsMainEvents";
import { Dimensions, View } from "react-native";



function Index({ cardsMain }) {
  const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width
  return (
    <View style={{height: 180, width: "100%", margin:10}} >
      <Carousel
        width={width*0.80}
        // height={200}
        loop={true}
        ref={ref}        
        style={{
          width:"100%",
          height: 200,        
          justifyContent: "center",
          alignItems: "center",
        }}        
        autoPlay={true}
        data={cardsMain}
        pagingEnabled={true}
        renderItem={({ item }) => (
          <CardsMainEvents
            date={item.date}
            title={item.title}
            urifoto={item.urifoto}
          />          
        )}
      />
    </View>
  );
}

export default Index;
