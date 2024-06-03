import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CardsMainEvents } from '../CardsMainEvents/CardsMainEvents';

function Carrosel(
  cardsMain
) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                  <CardsMainEvents 
        color={"red"} 
        title={"Startup Event"} 
        // urifoto={"https://conectanuvem.com.br/wp-content/uploads/2022/11/Capas-Blog-Imagem-destacadas-2022-44-930x620.png"}
        urifoto={"https://www.omnieventos.com/wp-content/uploads/2018/06/eventos-corporativos-1000x500.jpg"} 
        date={"01/06/2024"}      
        />
                )}
            />
        </View>
    );
}

export default Carrosel;