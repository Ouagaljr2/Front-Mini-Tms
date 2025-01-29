import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { deleteVehicle } from '../services/vehicleService';
import VehicleForm from './VehicleForm';



const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;


const VehicleList = ({ vehicles, fetchVehicles }) => {
    const [editingVehicle, setEditingVehicle] = useState(null);

    const handleDelete = async (id) => {
        const success = await deleteVehicle(id);
        if (success) fetchVehicles();
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
    };

    const closeEditForm = () => {
        setEditingVehicle(null);
    };

    if (!Array.isArray(vehicles)) {
        return <Text>Aucun véhicule disponible.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {editingVehicle ? (
                <VehicleForm
                    fetchVehicles={fetchVehicles}
                    initialVehicle={editingVehicle}
                    onClose={closeEditForm}
                />
            ) : (
                <View style={styles.listContainer}>
                    {vehicles.map((item) => (
                        <View key={item.id} style={styles.vehicleItem}>
                            <View style={styles.details}>
                                <Text style={styles.vehicleTitle}>Véhicule #{item.id}</Text>
                                <Text>Immatriculation: {item.registrationNumber}</Text>
                                <Text>Modèle: {item.model}</Text>
                                <Text>Status: {item.status}</Text>
                            </View>
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.buttonText}>Supprimer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
                                    <Text style={styles.buttonText}>Modifier</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',  // Centrer les éléments
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',  // Centrer les éléments
        padding: 20,
    },
    vehicleItem: {
        width: isSmallScreen ? '100%' : '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        maxWidth: 350, // Limiter la largeur maximale
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',  // Centrer les détails du véhicule

    },
    vehicleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        marginBottom: 15,
        alignItems: 'center',  // Centrer le texte
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',  // Centrer les boutons
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default VehicleList;
