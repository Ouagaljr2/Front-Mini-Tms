import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import VehicleForm from '../components/VehicleForm';
import VehicleList from '../components/VehicleList';
import { fetchVehicles, searchVehicles } from '../services/vehicleService';
import useRefreshData from '../components/useRefreshData'; // Import du hook personnalisé
import { isAuthenticated } from '../services/userService';


const VehiclesScreen = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);

    const fetchVehicleList = async () => {
        const data = await fetchVehicles();
        setVehicles(data);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            fetchVehicleList();
        } else {
            const data = await searchVehicles(searchQuery);
            console.log(data);
            setVehicles(data);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchVehicleList();
    }, []);
    return (
        <View style={styles.container}>
            {showForm ? (
                <VehicleForm
                    fetchVehicles={fetchVehicleList}
                    onClose={() => setShowForm(false)}
                />
            ) : (
                <>
                    <Button title="Ajouter un véhicule" onPress={() => setShowForm(true)} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher par immatriculation"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <Button title="Rechercher" onPress={handleSearch} />
                    <VehicleList vehicles={vehicles} fetchVehicles={fetchVehicleList} />
                </>
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
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
});

export default VehiclesScreen;
