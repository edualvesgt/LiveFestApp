import React, { useEffect, useRef, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, Linking } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapskey } from "../../utils/mapsApiKey";

export const Map = ({
  latitudeClinica = -23.448563,
  longitudeClinica = -46.534352,
  nomeClinica = "text",
}) => {
  const [initialPosition, setInitialPosition] = useState(null);
  const mapReference = useRef(null);

  async function CurrentLocation() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const captureLocation = await getCurrentPositionAsync();
      setInitialPosition(captureLocation);
    }
  }

  function reloadPreviewMap() {
    if (mapReference.current && initialPosition?.coords) {
      const coordinates = [
        { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude },
        { latitude: latitudeClinica, longitude: longitudeClinica },
      ];

      mapReference.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
        animated: true,
      });
    }
  }

  useEffect(() => {
    CurrentLocation();
  }, []);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitudeClinica},${longitudeClinica}`;
    Linking.openURL(url);
  };

  const openWaze = () => {
    const url = `https://www.waze.com/ul?ll=${latitudeClinica},${longitudeClinica}&navigate=yes`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {initialPosition !== null ? (
        <>
          <MapView
            ref={mapReference}
            initialRegion={{
              latitude: initialPosition.coords.latitude,
              longitude: initialPosition.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={grayMapStyle}
            style={{ flex: 1 }}
            onMapReady={reloadPreviewMap}
          >
            <Marker
              coordinate={{
                latitude: initialPosition.coords.latitude,
                longitude: initialPosition.coords.longitude,
              }}
              title="Você está aqui"
              description="Posição inicial"
              pinColor="green"
            />
            <MapViewDirections
              origin={initialPosition.coords}
              destination={{
                latitude: latitudeClinica,
                longitude: longitudeClinica,
              }}
              strokeWidth={5}
              strokeColor="#496BBA"
              apikey={mapskey}
            />
          </MapView>
          {/* Botão do Google Maps */}
          <TouchableOpacity style={styles.googleMapsButton} onPress={openGoogleMaps}>
            <Image source={require("../../../assets/google map.png")} style={styles.icon} />
          </TouchableOpacity>
          {/* Botão do Waze */}
          <TouchableOpacity style={styles.wazeButton} onPress={openWaze}>
            <Image source={require("../../../assets/Waze-icon-google-play-store.png")} style={styles.icon} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Localização não encontrada</Text>
          <ActivityIndicator />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  googleMapsButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  wazeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
});


const grayMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#E1E0E7",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#33303E",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#66DA9F",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#C6C5CE",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FBFBFB",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ACABB7",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#8C8A97",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#8EA5D9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#fbfbfb",
      },
    ],
  },
];