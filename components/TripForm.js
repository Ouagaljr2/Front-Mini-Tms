import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { addTrip, updateTrip } from '../services/tripService';
import { fetchDrivers } from '../services/driverService';
import { fetchVehicles } from '../services/vehicleService';
import { Picker } from '@react-native-picker/picker';

const TripForm = ({ fetchTrips, initialTrip = null, onClose }) => {
    const cities = [
        'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice',
        'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille',
    ];

    const [origin, setOrigin] = useState(initialTrip ? initialTrip.origin : '');
    const [destination, setDestination] = useState(initialTrip ? initialTrip.destination : '');
    const [date, setDate] = useState(initialTrip ? initialTrip.date : new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState(initialTrip ? initialTrip.status : 'attribué');
    const [driver, setDriver] = useState(initialTrip ? initialTrip.driver.id : '');
    const [vehicle, setVehicle] = useState(initialTrip ? initialTrip.vehicle.id : '');
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const driverData = await fetchDrivers();
                const vehicleData = await fetchVehicles();

                setDrivers(driverData.filter(d => d.status && d.status.toLowerCase() === 'disponible'));
                setVehicles(vehicleData.filter(v => v.status && v.status.toLowerCase() === 'disponible'));
            } catch (error) {
                setErrorMessage('Erreur lors du chargement des données : ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async () => {
        if (!origin || !destination || !driver || !vehicle) {
            setErrorMessage('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        if (origin === destination) {
            setErrorMessage("L'origine et la destination doivent être différentes.");
            return;
        }

        const tripData = {
            origin,
            destination,
            date,
            status,
            driver: { id: driver },
            vehicle: { id: vehicle },
        };

        let success;
        try {
            if (initialTrip) {
                success = await updateTrip(initialTrip.id, tripData);
            } else {
                success = await addTrip(tripData, driver, vehicle);
            }

            if (success) {
                fetchTrips();
                onClose();
            } else {
                setErrorMessage('Une erreur est survenue lors de la soumission.');
            }
        } catch (error) {
            setErrorMessage('Erreur : ' + error.message);
        }
    };

    if (loading) {
        return <Text style={styles.loadingText}>Chargement...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

                <Picker
                    selectedValue={origin}
                    onValueChange={(value) => setOrigin(value)}
                    style={styles.input}
                >
                    <Picker.Item label="Sélectionnez une origine" value="" />
                    {cities.map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={destination}
                    onValueChange={(value) => setDestination(value)}
                    style={styles.input}
                >
                    <Picker.Item label="Sélectionnez une destination" value="" />
                    {cities.filter(city => city !== origin).map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>

                <TextInput
                    style={[styles.input, styles.dateInput]}
                    placeholder="Sélectionnez une date"
                    value={date}
                    onChangeText={setDate}
                    keyboardType="default"
                />

                {initialTrip ? (
                    <>
                        <Text style={styles.input}>Conducteur : {driver}</Text>
                        <Text style={styles.input}>Véhicule : {vehicle}</Text>
                    </>
                ) : (
                    <>
                        <Picker
                            selectedValue={driver}
                            onValueChange={setDriver}
                            style={styles.input}
                        >
                            <Picker.Item label="Sélectionnez un conducteur" value="" />
                            {drivers.map((d) => (
                                <Picker.Item key={d.id} label={d.name} value={d.id} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={vehicle}
                            onValueChange={setVehicle}
                            style={styles.input}
                        >
                            <Picker.Item label="Sélectionnez un véhicule" value="" />
                            {vehicles.map((v) => (
                                <Picker.Item key={v.id} label={v.registrationNumber} value={v.id} />
                            ))}
                        </Picker>
                    </>
                )}

                <Button title={initialTrip ? 'Mettre à jour' : 'Ajouter'} onPress={handleSubmit} />
                {onClose && <Button title="Annuler" color="red" onPress={onClose} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    form: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    dateInput: {
        height: 40,
        paddingLeft: 10,
        marginBottom: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default TripForm;
