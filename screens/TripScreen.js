import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { fetchTrips } from '../services/tripService';
import TripForm from '../components/TripForm';
import TripList from '../components/TripList';
import useRefreshData from '../components/useRefreshData'; // Import du hook personnalisé
import { Picker } from '@react-native-picker/picker'; // Mise à jour de l'importation
import { isAuthenticated } from '../services/userService';

const TripScreen = () => {
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [searchBy, setSearchBy] = useState('origin');  // Critère de recherche ('origin' ou 'destination')
    const [isFormVisible, setFormVisible] = useState(false);

    // Charger les trajets
    const loadTrips = async () => {
        const tripData = await fetchTrips();
        setTrips(tripData);
        setFilteredTrips(tripData);
    };

    // Filtrer les trajets en fonction du critère de recherche (origine ou destination)
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filteredData = trips.filter(
                (trip) =>
                    trip[searchBy].toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTrips(filteredData);
        } else {
            setFilteredTrips(trips);
        }
    };

    useEffect(() => {
        if (isAuthenticated) loadTrips();
    }, []);

    return (
        <View style={styles.container}>
            {/* Picker pour choisir entre origine ou destination */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={searchBy}
                    onValueChange={setSearchBy}
                    style={styles.picker}
                >
                    <Picker.Item label="Origine" value="origin" />
                    <Picker.Item label="Destination" value="destination" />
                </Picker>
            </View>

            {/* Champ de recherche */}
            <TextInput
                style={styles.searchInput}
                placeholder={`Rechercher par ${searchBy === 'origin' ? 'origine' : 'destination'}`}
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Bouton pour ajouter un trajet */}
            <Button title="Ajouter un trajet" onPress={() => setFormVisible(true)} />

            {/* Affichage du formulaire ou de la liste de trajets */}
            {isFormVisible ? (
                <TripForm fetchTrips={loadTrips} onClose={() => setFormVisible(false)} />
            ) : (
                <TripList trips={filteredTrips} fetchTrips={loadTrips} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    pickerContainer: {
        marginBottom: 10,
    },
    picker: {
        height: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default TripScreen;
