import React, { useEffect, useRef, useState } from "react";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationAccuracy,
} from "expo-location";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
    ImageBackground,
} from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { mapskey } from "../../utils/mapsApiKey";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export const Map = ({ route, navigation }) => {
    // Verifica se route.params está definido
    if (!route.params) {
        // Retorna alguma ação para lidar com o caso em que route.params não está definido
        return (
            <View style={styles.container}>
                <Text>Parâmetros não encontrados</Text>
            </View>
        );
    }
    
    const {
        latitudeEvento,
        longitudeEvento,
        nomeEvento,
        dataEvento,
        descricaoEvento,
    } = route.params;
    const [initialPosition, setInitialPosition] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
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
                {
                    latitude: initialPosition.coords.latitude,
                    longitude: initialPosition.coords.longitude,
                },
                { latitude: latitudeEvento, longitude: longitudeEvento },
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
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitudeEvento},${longitudeEvento}`;
        Linking.openURL(url);
    };

    const openWaze = () => {
        const url = `https://www.waze.com/ul?ll=${latitudeEvento},${longitudeEvento}&navigate=yes`;
        Linking.openURL(url);
    };

    const truncateDescription = (description, limit) => {
        const words = description.split(" ");
        if (words.length > limit) {
            return `${words.slice(0, limit).join(" ")} ...`;
        } else {
            return description;
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <View style={styles.container}>
            <View style={styles.stickyHeader}>
                <ImageBackground
                    source={require("../../../assets/Header Rota do Evento.png")}
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("DetailedCard")}
                        style={styles.backButton}
                    >
                        <Icon name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Rota do Evento</Text>
                </ImageBackground>
            </View>

            {initialPosition !== null ? (
                <MapView
                    ref={mapReference}
                    toolbarEnabled={false}
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
                            latitude: latitudeEvento,
                            longitude: longitudeEvento,
                        }}
                        strokeWidth={5}
                        strokeColor="#496BBA"
                        apikey={mapskey}
                    />
                </MapView>
            ) : (
                <>
                    <Text>Localização não encontrada</Text>
                    <ActivityIndicator />
                </>
            )}
            <View style={styles.buttonContainer}>
                {/* Botão do Google Maps */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={openGoogleMaps}
                >
                    <Image
                        source={require("../../../assets/google map.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {/* Botão do Waze */}
                <TouchableOpacity style={styles.button} onPress={openWaze}>
                    <Image
                        source={require("../../../assets/Waze-icon-google-play-store.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.detalhesEvento}>
                <Text style={styles.eventoData}>{dataEvento}</Text>
                <Text style={styles.eventoNome}>{nomeEvento}</Text>
                <Text style={styles.descricaoEvento}>
                    {showFullDescription
                        ? descricaoEvento
                        : truncateDescription(descricaoEvento, 20)}
                </Text>
                {!showFullDescription &&
                    descricaoEvento.split(" ").length > 15 && (
                        <TouchableOpacity onPress={toggleDescription}>
                            <Text style={styles.showMoreText}>Ver mais</Text>
                        </TouchableOpacity>
                    )}
                {showFullDescription && (
                    <TouchableOpacity onPress={toggleDescription}>
                        <Text style={styles.showMoreText}>Ver menos</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 25,
        backgroundColor: "white",
        padding: 10,
        elevation: 5,
        marginBottom: 160,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    stickyHeader: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
    },
    header: {
        height: 120,
        padding: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        left: 16,
        top: 38,
    },
    headerTitle: {
        padding: 16,
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    detalhesEvento: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 16,
    },
    eventoNome: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: "MontserratAlternates_500Medium",
    },
    eventoData: {
        marginBottom: 10,
        fontSize: 16,
        color: "#666",
        fontFamily: "MontserratAlternates_500Medium",
    },
    descricaoEvento: {
        fontSize: 14,
        color: "#666",
        fontFamily: "Raleway_500Medium",
    },
    showMoreText: {
        color: "#007BFF",
        marginTop: 5,
        fontFamily: "Raleway_500Medium",
        marginBottom: 20,
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
