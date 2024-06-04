import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CardsMainEvents } from '../CardsMainEvents/CardsMainEvents';

function Carrosel(
    {cardsMain}
) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={cardsMain}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <CardsMainEvents
                        title={item.title}
                        // urifoto={"https://conectanuvem.com.br/wp-content/uploads/2022/11/Capas-Blog-Imagem-destacadas-2022-44-930x620.png"}
                        urifoto={item.urifoto}
                        date={item.date}
                    />
                )}
            />
        </View>
    );
}

export default Carrosel;