import React, { useState } from "react";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import Carrossel from "../Carrosel/Carrosel";


export default function NearbyPoints({
  cardsMain
}) {
  let distanciaKM;
  const [distanceOfDisplay, setDistanceOfDisplay] = useState(30);

  const [region, setRegion] = useState({
    latitude: -23.74510,
    longitude: -46.53156,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers] = useState(
    cardsMain
  )

  console.log('Markers = ',markers)
  // const [markers] = useState([
  //   {
  //     id: 1,
  //     latlng: { latitude: -23.67122, longitude: -46.53236 },
  //     //2861022784, 9583382255
  //     title: "Marker 1",
  //     description: "This is marker 1",
  //   },
  //   {
  //     id: 2,
//     latlng: { latitude: -23.61511, longitude: -46.57071 },
  //     title: "Marker 2",
  //     description: "This is marker 2",
  //     //609208946, 2520706856
  //   },
  //   {
  //     id: 3,
  //     latlng: { latitude: 37.78975, longitude: -122.4354 },
  //     title: "Marker 3",
  //     description: "This is marker 3",
  //   },
  //   {
  //     id: 4,
  //     latlng: { latitude: -23.74499, longitude: -46.53141 },
  //     title: "Marker 3",
  //     description: "This is marker 3",
  //   }
  // ]);

  const onRegionChange = (newRegion) => {
    console.log(newRegion);
    setRegion(newRegion);
  };

  // Função para filtrar marcadores próximos à região atual
  const getMarkersInRegion = () => {
    return markers.filter(marker => {
      const distance = calculateDistance(region.latitude, region.longitude, marker.latlng.latitude, marker.latlng.longitude);
      // Defina uma distância máxima para considerar um marcador como "próximo"
      const maxDistance = 1; // por exemplo, 0.1 graus de latitude ou longitude
      return distance <= distanceOfDisplay;
    });
  };

  // Função para calcular a distância entre duas coordenadas (em graus)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // raio da Terra em km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distância em km
    console.log(distance)
    return distance;
  };

  // Função auxiliar para converter graus em radianos
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };



  return (
    <View style={styles.container}>
      <MapView
        region={region}
        // onRegionChange={onRegionChange} 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        toolbarEnabled={false}
      >
        {getMarkersInRegion().map((marker,index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            // description={marker.description}
          />
        ))}
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={distanceOfDisplay * 1000} // Converter de km para metros
          fillColor="rgba(255, 0, 0, 0.5)" // Cor de preenchimento do círculo
          strokeColor="rgba(255, 0, 0, 0.8)" // Cor da borda do círculo
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
});
