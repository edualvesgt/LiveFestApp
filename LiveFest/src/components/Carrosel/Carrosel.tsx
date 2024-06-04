import React, { useState,useRef } from 'react';
import { View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";


import { SBItem } from "./SBItem";
import SButton from "./SButton";
import { ElementsText, window } from "./constants";
import { CardsMainEvents } from '../CardsMainEvents/CardsMainEvents';

const PAGE_WIDTH = window.width;

function Index({
  cardsMain
}) {
  const [data, setData] = useState ([...new Array(6).keys()]);
  const [isFast, setIsFast] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = useState(true);
  const ref = useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop={true}
        ref={ref}
        style={{ width: "100%" }}
        autoPlay={true}
        autoPlayInterval={isFast ? 100 : 2000}
        data={cardsMain}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={({ item }) => (
          <CardsMainEvents
            date={item.date}
            title={item.title}
            urifoto={item.urifoto}          
          />
        )
        }
      />
      {/* <SButton
        onPress={() => {
          setIsFast(!isFast);
        }}
      >
        {isFast ? "NORMAL" : "FAST"}
      </SButton>
      <SButton
        onPress={() => {
          setIsPagingEnabled(!isPagingEnabled);
        }}
      >
                PagingEnabled:{isPagingEnabled.toString()}
      </SButton>
      <SButton
        onPress={() => {
          setIsAutoPlay(!isAutoPlay);
        }}
      >
        {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
      </SButton>
      <SButton
        onPress={() => {
          console.log(ref.current?.getCurrentIndex());
        }}
      >
                Log current index
      </SButton>
      <SButton
        onPress={() => {
          setData(
            data.length === 6
              ? [...new Array(8).keys()]
              : [...new Array(6).keys()],
          );
        }}
      >
                Change data length to:{data.length === 6 ? 8 : 6}
      </SButton>
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: -1, animated: true });
        }}
      >
                prev
      </SButton>
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: 1, animated: true });
        }}
      >
                next
      </SButton> */}
    </View>
  );
}

export default Index;