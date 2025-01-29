import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Image } from 'react-native';
import DriverForm from '../components/DriverForm';
import DriverList from '../components/DriverList';
import { fetchDrivers, searchDrivers } from '../services/driverService';
import useRefreshData from '../components/useRefreshData'; // Import du hook personnalisé
import { isAuthenticated } from '../services/userService';


const DriversScreen = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormVisible, setFormVisible] = useState(false);

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
        <View style={styles.container}>
            {/* Image en haut de l'écran */}
            <Image
                source={require('../assets/drivers.jpg')} // Remplacez par votre image
                style={styles.image}
                resizeMode="contain"
            />

            {!isFormVisible && (
                <Button title="Ajouter un conducteur" onPress={openForm} />
            )}

            {isFormVisible && (
                <DriverForm fetchDrivers={fetchDriverList} onClose={closeForm} />
            )}

            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher par nom"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
            />
            <Button title="Rechercher" onPress={handleSearch} />

            <DriverList drivers={drivers} fetchDrivers={fetchDriverList} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200, // Ajustez la hauteur selon vos besoins
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default DriversScreen;
