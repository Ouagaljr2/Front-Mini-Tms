import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { deleteTrip } from '../services/tripService';
import TripForm from './TripForm';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 360;

const TripList = ({ trips, fetchTrips }) => {
    const [editingTrip, setEditingTrip] = useState(null);

    const handleDelete = async (id) => {
        const success = await deleteTrip(id);
        if (success) fetchTrips();
    };

    const handleEdit = (trip) => {
        setEditingTrip(trip);
    };

    const closeEditForm = () => {
        setEditingTrip(null);
    };

    // Vérification que 'trips' est un tableau
    if (!Array.isArray(trips)) {
        return <Text>Aucun trajet disponible.</Text>;
    }

    return (
        <ScrollView style={styles.scrollView}>
            {editingTrip ? (
                <TripForm
                    fetchTrips={fetchTrips}
                    initialTrip={editingTrip}
                    onClose={closeEditForm}
                />
            ) : (
                <View style={styles.listContainer}>
                    {trips.map((item) => (
                        <View key={item.id} style={styles.tripItem}>
                            <View style={styles.tripDetails}>
                                <Text style={styles.title}>Trajet #{item.id}</Text>
                                <Text>Origine: {item.origin}</Text>
                                <Text>Destination: {item.destination}</Text>
                                <Text>Distance: {item.distance} km</Text>
                                <Text>Date: {item.date}</Text>
                                <Text>Statut: {item.status}</Text>
                                <Text>Driver ID: {item.driver ? item.driver.id : 'Non assigné'}</Text>
                                <Text>Vehicle ID: {item.vehicle ? item.vehicle.id : 'Non assigné'}</Text>
                            </View>
                            <View style={styles.tripActions}>
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
    scrollView: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    listContainer: {
        padding: 10,
    },
    tripItem: {
        width: isSmallScreen ? '100%' : '100%',

        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    tripDetails: {
        marginBottom: 15,
    },
    tripActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '48%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default TripList;
