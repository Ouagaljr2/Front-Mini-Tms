import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Card, useTheme, ActivityIndicator } from 'react-native-paper'; // Composants UI de React Native Paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour les icônes
import { Picker } from '@react-native-picker/picker'; // Mise à jour de l'importation
import TripForm from '../components/TripForm';
import TripList from '../components/TripList';
import { fetchTrips } from '../services/tripService';
import { isAuthenticated } from '../services/userService';

const TripScreen = () => {
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [searchBy, setSearchBy] = useState('origin'); // Critère de recherche ('origin' ou 'destination')
    const [isFormVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { colors } = useTheme(); // Utilisation du thème pour les couleurs

    // Charger les trajets
    const loadTrips = async () => {
        setLoading(true);
        setError(null);
        try {
            const tripData = await fetchTrips();
            setTrips(tripData);
            setFilteredTrips(tripData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image en haut de l'écran */}
            <Image
                source={require('../assets/trips.jpg')} // Remplacez par votre image
                style={styles.image}
                resizeMode="cover"
            />

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
                left={<TextInput.Icon name="magnify" />} // Icône de recherche
                mode="outlined"
            />

            {/* Bouton pour ajouter un trajet */}
            {!isFormVisible && (
                <Button
                    mode="contained"
                    onPress={() => setFormVisible(true)}
                    style={styles.addButton}
                    icon={() => <Icon name="plus" size={20} color="#fff" />}
                >
                    Ajouter un trajet
                </Button>
            )}

            {/* Affichage du formulaire ou de la liste de trajets */}
            {isFormVisible ? (
                <Card style={styles.formCard}>
                    <Card.Content>
                        <TripForm fetchTrips={loadTrips} onClose={() => setFormVisible(false)} />
                    </Card.Content>
                </Card>
            ) : (
                <>
                    {loading && <ActivityIndicator animating={true} color={colors.primary} />}
                    {error && <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 10 }}>{error}</Text>}
                    <TripList trips={filteredTrips} fetchTrips={loadTrips} />
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 20,
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
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        marginBottom: 20,
        backgroundColor: '#6200ee', // Couleur primaire
    },
    formCard: {
        marginBottom: 20,
        borderRadius: 8,
    },
});

export default TripScreen;