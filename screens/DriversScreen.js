import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Card, Title, useTheme } from 'react-native-paper'; // Composants UI de React Native Paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour les icônes
import DriverForm from '../components/DriverForm';
import DriverList from '../components/DriverList';
import { fetchDrivers, searchDrivers } from '../services/driverService';
import { isAuthenticated } from '../services/userService';

const DriversScreen = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormVisible, setFormVisible] = useState(false);
    const { colors } = useTheme(); // Utilisation du thème pour les couleurs

    const fetchDriverList = async () => {
        const data = await fetchDrivers();
        setDrivers(data);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            fetchDriverList();
        } else {
            const data = await searchDrivers(searchQuery);
            setDrivers(data);
        }
    };

    const openForm = () => setFormVisible(true);
    const closeForm = () => setFormVisible(false);

    useEffect(() => {
        if (isAuthenticated) fetchDriverList();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image en haut de l'écran */}
            <Image
                source={require('../assets/drivers.jpg')} // Remplacez par votre image
                style={styles.image}
                resizeMode="cover"
            />

            {/* Bouton pour ajouter un conducteur */}
            {!isFormVisible && (
                <Button
                    mode="contained"
                    onPress={openForm}
                    style={styles.addButton}
                    icon={() => <Icon name="plus" size={20} color="#fff" />}
                >
                    Ajouter un conducteur
                </Button>
            )}

            {/* Formulaire d'ajout de conducteur */}
            {isFormVisible && (
                <Card style={styles.formCard}>
                    <Card.Content>
                        <DriverForm fetchDrivers={fetchDriverList} onClose={closeForm} />
                    </Card.Content>
                </Card>
            )}

            {/* Barre de recherche */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Rechercher par nom"
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

            {/* Liste des conducteurs */}
            <DriverList drivers={drivers} fetchDrivers={fetchDriverList} />
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

export default DriversScreen;