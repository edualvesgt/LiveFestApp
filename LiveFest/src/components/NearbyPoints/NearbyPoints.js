import React, { useEffect, useRef, useState } from "react";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Linking } from "react-native";
import { Marker } from "react-native-maps";
import Carrossel from "../Carrosel/Carrosel";
import MapViewDirections from "react-native-maps-directions";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
import { mapskey } from "../../utils/mapsApiKey";
import AntDesign from '@expo/vector-icons/AntDesign';


const GOOGLE_MAPS_APIKEY = "AIzaSyCP6zqLswfuGOEvMp8ceKnv20g2JsztPSw";

export default function NearbyPoints({
  navigation,
  events
}) {

  const mapReference = useRef(null);
  const [distanceOfDisplay, setDistanceOfDisplay] = useState(20);
  const [initialPosition, setInitialPosition] = useState(null);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
  const [endPosition, setEndPosition] = useState(null);
  const [markerFilter, setMarkerFilter] = useState([]);

  const [markers] = useState(events);


  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${markerFilter[selectedMarkerIndex].address.latitude},${markerFilter[selectedMarkerIndex].address.longitude}`;
    Linking.openURL(url);
  };

  const openWaze = () => {
    const url = `https://www.waze.com/ul?ll=${markerFilter[selectedMarkerIndex].address.latitude},${markerFilter[selectedMarkerIndex].address.longitude}&navigate=yes`;
    Linking.openURL(url);
  };

  //Função finalizada
  //Função para obter a coordenadas do dispositivo
  async function CurrentLocation() {
    const { granted } = await requestForegroundPermissionsAsync(); // Solicita ao usuário que conceda permissões de localização enquanto o aplicativo estiver em primeiro plano.
    if (granted) { // Se a permissão for concedida faza
      const captureLocation = await getCurrentPositionAsync()
      setInitialPosition(captureLocation);// Seta a posição inicial com a localização obtida
    }
  }


  //Função Finalizada

  // Função auxiliar para converter graus em radianos
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
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
    console.log("distancia em calculateDistance = ", distance)
    return distance;
  };




  const onEndPositionChange = (newPosition) => {
    console.log(newPosition);
    setEndPosition(newPosition);
  };

  const handleCardSelect = (index) => {
    console.log(`Card selected: ${index}`); // Log para depuração
    const selectedMarker = markers[index];
    setSelectedMarkerIndex(index);
  };

  useEffect(() => {
    CurrentLocation();
  }, [])

  useEffect(() => {
    //Filtra os dados apenas para dentro do raio setado em distanceOfDisplay
    if (initialPosition !== null) {
      const eventsFilter = markers.filter(marker => {
        // console.log(initialPosition.coords?.longitude, marker.longitude)
        const distance = calculateDistance(initialPosition.coords?.latitude, initialPosition.coords?.longitude, marker.address.latitude, marker.address.longitude);
        // Defina uma distância máxima para considerar um marcador como "próximo"
        const maxDistance = 1; // por exemplo, 0.1 graus de latitude ou longitude
        return distance <= distanceOfDisplay;
      });
      setMarkerFilter(eventsFilter)
    }
    reloadPreviewMap()

  }, [initialPosition, distanceOfDisplay])

  function reloadPreviewMap() {
    if (initialPosition && mapReference.current) {
      const coordinates = [
        { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
        {
          latitude: initialPosition.coords.latitude + (distanceOfDisplay / 111.32),
          longitude: initialPosition.coords.longitude
        },
        {
          latitude: initialPosition.coords.latitude - (distanceOfDisplay / 111.32),
          longitude: initialPosition.coords.longitude
        },
        {
          latitude: initialPosition.coords.latitude,
          longitude: initialPosition.coords.longitude + (distanceOfDisplay / (111.32 * Math.cos(initialPosition.coords.latitude * (Math.PI / 180))))
        },
        {
          latitude: initialPosition.coords.latitude,
          longitude: initialPosition.coords.longitude - (distanceOfDisplay / (111.32 * Math.cos(initialPosition.coords.latitude * (Math.PI / 180))))
        }
      ];
      mapReference.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 5, right: 5, bottom: 5, left: 5 },
        animated: true,
      });
    }
  }

  return (
    <View style={styles.container}>

      {/* MapView = Exibe de fato o map */}
      {initialPosition !== null ?
        <View style={{ flex: 1, position: "relative" }}>
          <MapView
            ref={mapReference}
            // initialRegion={getRegionForCoordinates(initialPosition.coords.latitude, initialPosition.coords.longitude, distanceOfDisplay)}
            // region={region}
            // onRegionChange={onRegionChange} 
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            toolbarEnabled={false}

            onMapReady={() => { reloadPreviewMap() }}
          >

            <Marker
              coordinate={{
                latitude: initialPosition.coords?.latitude,
                longitude: initialPosition.coords?.longitude,
              }}
              title="Você está aqui!"
              pinColor="green"
            />
            {
              (markerFilter.length > 0) && markerFilter[selectedMarkerIndex] ?
                <MapViewDirections
                  origin={initialPosition.coords}
                  destination={{
                    latitude: markerFilter[selectedMarkerIndex].address.latitude,
                    longitude: markerFilter[selectedMarkerIndex].address.longitude,
                  }}
                  strokeWidth={5}
                  strokeColor="#496BBA"
                  apikey={GOOGLE_MAPS_APIKEY}

                />
                :
                <></>
            }




            {/* Mostra os pontos dos eventos no map */}
            {initialPosition !== null ? markerFilter.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.address.latitude,
                  longitude: marker.address.longitude
                }}
                title={marker.eventName}
                pinColor="tan"
              // description={marker.description}
              />
            ))
              :
              <></>
            }
            {/* Circulo correspondente ao raio selecionado pelo usuario */}
            <Circle
              center={{ latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude }}
              radius={distanceOfDisplay * 1000} // Converter de km para metros
              fillColor="rgba(150, 150, 150, 0.5)" // Cor de preenchimento do círculo
              strokeColor="rgba(255, 0, 0, 0.8)" // Cor da borda do círculo
            />
          </MapView>

          

          <View style={{ position: "absolute", right: 10, bottom: 10, gap: 20, padding: 5, borderRadius: 100, alignItems: "center", backgroundColor: "#FFF" }} >
            <TouchableOpacity
              onPress={() => {
                setDistanceOfDisplay(distanceOfDisplay + 5)
              }
              }
            >
              <AntDesign name="pluscircle" size={32} color="#956ADF" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 900 }} >{distanceOfDisplay} Km</Text>
            <TouchableOpacity
              onPress={() => {
                if (distanceOfDisplay > 5) {
                  setDistanceOfDisplay(distanceOfDisplay - 5)
                }
              }
              }
            >
              <AntDesign name="minuscircle" size={32} color="#956ADF" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
              <Image
                source={require("../../../assets/google map.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openWaze}>
              <Image
                source={require("../../../assets/Waze-icon-google-play-store.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
          <Text>Obtendo coordenadas do dispositivo</Text>
        </View>
      }


      {
        markerFilter.length > 0 ?
          <Carrossel
            autoPlay={false}
            loop={false}
            events={markerFilter}
            handleCardSelect={handleCardSelect}
            navigation={navigation}
          />
          :
          <View style={{ height: 180, width: "100%", margin: 10, padding: 20, justifyContent: "center", alignItems: "center" }} >
            <Text style={{ fontFamily: "MontserratAlternates_600SemiBold", fontSize: 20, color: "#956ADF" }}>Não há nenhum evento em um raio de {distanceOfDisplay} Km da sua posição</Text>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 5,
    left:0,
    width:"100%",
    gap: 20

    // paddingHorizontal: 20,
  },
  button: {
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
    elevation: 5,
    // marginBottom: 160,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
