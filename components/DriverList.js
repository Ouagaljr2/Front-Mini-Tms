import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { deleteDriver } from '../services/driverService';
import DriverForm from './DriverForm';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

const DriverList = ({ drivers, fetchDrivers }) => {
    const [editingDriver, setEditingDriver] = useState(null);

    const handleDelete = async (id) => {
        const success = await deleteDriver(id);
        if (success) fetchDrivers();
    };

    const handleEdit = (driver) => {
        setEditingDriver(driver);
    };

    const closeEditForm = () => {
        setEditingDriver(null);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {editingDriver ? (
                <DriverForm
                    fetchDrivers={fetchDrivers}
                    initialDriver={editingDriver}
                    onClose={closeEditForm}
                />
            ) : (
                <View style={styles.listContainer}>
                    {drivers.map((item) => (
                        <View key={item.id} style={styles.driverItem}>
                            <View style={styles.driverDetails}>
                                <Text style={styles.title}>Conducteur #{item.id}</Text>
                                <Text>Nom: {item.name}</Text>
                                <Text>Licence: {item.licenseNumber}</Text>
                                <Text>Téléphone: {item.phoneNumber}</Text>
                                <Text>Email: {item.email}</Text>
                                <Text>Statut: {item.status}</Text>
                            </View>
                            <View style={styles.driverActions}>
                                <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.buttonText}>Supprimer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
                                    <Text style={styles.buttonText}>Mettre à jour</Text>
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

    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 20,
    },
    driverItem: {
        width: isSmallScreen ? '100%' : '150%',
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 8,
        maxWidth: 350, // Limiter la largeur maximale
        marginBottom: 20,
        alignItems: 'center',
    },

    driverDetails: {
        marginBottom: 15,
    },
    driverActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
export default DriverList;
