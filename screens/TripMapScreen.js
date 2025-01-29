import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { fetchTrips } from '../services/tripService'; // À définir pour récupérer les trajets


import { Platform } from 'react-native';

let MapView;
if (Platform.OS !== 'web') {
    MapView = require('react-native-maps').default;
}

// Ensuite, vous pouvez utiliser MapView uniquement si la plateforme n'est pas "web"

// Fonction pour calculer la distance entre deux coordonnées (en km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retourne la distance en kilomètres
};

const TripMapScreen = () => {
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fonction pour charger les trajets depuis l'API
    const loadTrips = async () => {
        const data = await fetchTrips(); // Récupère les trajets depuis votre backend
        setTrips(data);
    };

    useEffect(() => {
        loadTrips();
    }, []);

    const handleSearch = () => {
        // Implémentez la logique de recherche ici
        // Par exemple, vous pouvez filtrer les trajets par origine/destination
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un trajet"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Button title="Rechercher" onPress={handleSearch} />

            {trips.map((trip) => {
                const distance = calculateDistance(
                    trip.origin.latitude,
                    trip.origin.longitude,
                    trip.destination.latitude,
                    trip.destination.longitude
                );
                return (
                    <View key={trip.id} style={styles.tripContainer}>
                        {/* Détails du trajet */}
                        <Text style={styles.tripText}>
                            Trip from {trip.origin.name} to {trip.destination.name}
                        </Text>
                        <Text style={styles.tripText}>Distance: {distance.toFixed(2)} km</Text>

                        {/* Affichage de la carte */}
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: (trip.origin.latitude + trip.destination.latitude) / 2,
                                    longitude: (trip.origin.longitude + trip.destination.longitude) / 2,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: trip.origin.latitude,
                                        longitude: trip.origin.longitude,
                                    }}
                                    title={`Origin: ${trip.origin.name}`}
                                />
                                <Marker
                                    coordinate={{
                                        latitude: trip.destination.latitude,
                                        longitude: trip.destination.longitude,
                                    }}
                                    title={`Destination: ${trip.destination.name}`}
                                />
                                <Polyline
                                    coordinates={[
                                        { latitude: trip.origin.latitude, longitude: trip.origin.longitude },
                                        { latitude: trip.destination.latitude, longitude: trip.destination.longitude },
                                    ]}
                                    strokeColor="#0000FF"
                                    strokeWidth={4}
                                />
                            </MapView>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    tripContainer: {
        marginBottom: 20,
    },
    tripText: {
        fontSize: 16,
        marginBottom: 5,
    },
    mapContainer: {
        height: 250,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
    map: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
    },
});

export default TripMapScreen;
