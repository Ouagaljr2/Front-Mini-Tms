import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Card, useTheme } from 'react-native-paper'; // Composants UI de React Native Paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour les icônes
import VehicleForm from '../components/VehicleForm';
import VehicleList from '../components/VehicleList';
import { fetchVehicles, searchVehicles } from '../services/vehicleService';
import { isAuthenticated } from '../services/userService';

const VehiclesScreen = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const { colors } = useTheme(); // Utilisation du thème pour les couleurs

    const fetchVehicleList = async () => {
        const data = await fetchVehicles();
        setVehicles(data);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            fetchVehicleList();
        } else {
            const data = await searchVehicles(searchQuery);
            setVehicles(data);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchVehicleList();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image en haut de l'écran */}
            <Image
                source={require('../assets/cars.jpg')} // Remplacez par votre image
                style={styles.image}
                resizeMode="cover"
            />

            {/* Bouton pour ajouter un véhicule */}
            {!showForm && (
                <Button
                    mode="contained"
                    onPress={() => setShowForm(true)}
                    style={styles.addButton}
                    icon={() => <Icon name="plus" size={20} color="#fff" />}
                >
                    Ajouter un véhicule
                </Button>
            )}

            {/* Formulaire d'ajout de véhicule */}
            {showForm && (
                <Card style={styles.formCard}>
                    <Card.Content>
                        <VehicleForm fetchVehicles={fetchVehicleList} onClose={() => setShowForm(false)} />
                    </Card.Content>
                </Card>
            )}

            {/* Barre de recherche */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher par immatriculation"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                    left={<TextInput.Icon name="magnify" />} // Icône de recherche
                />
                <Button
                    mode="contained"
                    onPress={handleSearch}
                    style={styles.searchButton}
                >
                    Rechercher
                </Button>
            </View>

            {/* Liste des véhicules */}
            <VehicleList vehicles={vehicles} fetchVehicles={fetchVehicleList} />
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
    addButton: {
        marginBottom: 20,
        backgroundColor: '#6200ee', // Couleur primaire
    },
    formCard: {
        marginBottom: 20,
        borderRadius: 8,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    searchButton: {
        backgroundColor: '#6200ee', // Couleur primaire
    },
});

export default VehiclesScreen;