import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Card, useTheme, Text } from 'react-native-paper';
import { addVehicle, updateVehicle } from '../services/vehicleService';

const VehicleForm = ({ fetchVehicles, initialVehicle = null, onClose }) => {
    const { colors } = useTheme();
    const [registrationNumber, setRegistrationNumber] = useState(initialVehicle ? initialVehicle.registrationNumber : 'FR-');
    const [status] = useState('Disponible');
    const [model, setModel] = useState(initialVehicle ? initialVehicle.model : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegistrationChange = (text) => {
        if (text.length <= 10 && text.startsWith('FR-')) {
            const numericPart = text.slice(3);
            if (/^\d*$/.test(numericPart)) {
                setRegistrationNumber(text.toUpperCase());
                setError(null);
            } else {
                setError('Le numéro d\'immatriculation doit commencer par "FR-" et être suivi uniquement de chiffres.');
            }
        } else if (text.length <= 10) {
            setRegistrationNumber(text.toUpperCase());
            setError(null);
        } else {
            setError('Le numéro d\'immatriculation ne peut pas dépasser 10 caractères.');
        }
    };

    const handleSubmit = async () => {
        if (!registrationNumber || !model) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setLoading(true);
        const vehicleData = { registrationNumber, status, model };
        let success;
        if (initialVehicle) {
            success = await updateVehicle(initialVehicle.id, vehicleData);
        } else {
            success = await addVehicle(vehicleData);
        }
        setLoading(false);

        if (success) {
            fetchVehicles();
            onClose();
        } else {
            setError('Une erreur est survenue, veuillez réessayer.');
        }
    };

    return (
        <View style={styles.overlay}>
            <Card style={styles.card}>
                <Card.Title
                    title={initialVehicle ? 'Modifier Véhicule' : 'Ajouter Véhicule'}
                    titleStyle={styles.cardTitle}
                />
                <Card.Content>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TextInput
                        label="Numéro d'immatriculation (ex: FR-12345678)"
                        value={registrationNumber}
                        onChangeText={handleRegistrationChange}
                        style={styles.input}
                        mode="outlined"
                        maxLength={10}
                    />
                    <TextInput
                        label="Modèle"
                        value={model}
                        onChangeText={setModel}
                        style={styles.input}
                        mode="outlined"
                    />
                    <Text style={styles.statusText}>Statut: {status}</Text>

                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        loading={loading}
                        disabled={loading}
                    >
                        {initialVehicle ? 'Mettre à jour' : 'Ajouter'}
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={onClose}
                        style={styles.button}
                        color={colors.error}
                    >
                        Annuler
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
        width: '90%',
        maxWidth: 400,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    statusText: {
        textAlign: 'center',
        marginBottom: 10,
        color: '#555',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});

export default VehicleForm;