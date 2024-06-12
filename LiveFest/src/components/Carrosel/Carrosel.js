import React, { useEffect, useRef, useState } from "react";
// import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { CardsMainEvents } from "../CardsMainEvents/CardsMainEvents";
import { Dimensions, View } from "react-native";



function Carrossel({   
  events,
  loop=true,
  autoPlay=true, 
  handleCardSelect, 
}) {
  // const ref = useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width
  const [carouselKey, setCarouselKey] = useState(events.length);

  useEffect(() => {
    // Update the key whenever events change
    setCarouselKey(events.length);
    console.log(carouselKey)
    handleCardSelect(0)
  }, [events]);

  return (
    <View style={{height: 180, width: "100%", margin:10}} >
      <Carousel
        key={carouselKey}
        onSnapToItem={(index) => handleCardSelect(index)}

        width={width*0.90}
        // height={200}
        loop={loop}
        // ref={ref}        
        style={{
          width:"100%",
          height: 200,          
        }}        
        autoPlay={autoPlay}
        data={events}
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

export default Carrossel;
