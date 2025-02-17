import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Card, useTheme, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addDriver, updateDriver } from '../services/driverService';

const DriverForm = ({ fetchDrivers, initialDriver = null, onClose }) => {
    const { colors } = useTheme();
    const [name, setName] = useState(initialDriver ? initialDriver.name : '');
    const [licenseNumber, setLicenseNumber] = useState(initialDriver ? initialDriver.licenseNumber : 'FR-');
    const [phoneNumber, setPhoneNumber] = useState(initialDriver ? initialDriver.phoneNumber : '+33');
    const [email, setEmail] = useState(initialDriver ? initialDriver.email : '');
    const [status] = useState('Disponible');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLicenseChange = (text) => {
        if (text.length <= 8 && text.startsWith('FR-')) {
            setLicenseNumber(text.toUpperCase());
            setError(null);
        } else {
            setError('Le numéro de licence doit commencer par "FR-" et être de 8 chiffres.');
        }
    };

    const handlePhoneChange = (text) => {
        if (text.startsWith('+33') && text.length <= 13 && !isNaN(text.slice(4))) {
            setPhoneNumber(text);
            setError(null);
        } else {
            setError('Le numéro de téléphone doit commencer par "+33" suivi de 8 chiffres.');
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(text)) {
            setError('L\'email n\'est pas valide.');
        } else {
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (!name || !licenseNumber || !phoneNumber || !email) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setLoading(true);
        const driverData = { name, licenseNumber, phoneNumber, email, status };
        let success;
        if (initialDriver) {
            success = await updateDriver(initialDriver.id, driverData);
        } else {
            success = await addDriver(driverData);
        }
        setLoading(false);

        if (success) {
            fetchDrivers();
            onClose();
        } else {
            setError('Une erreur est survenue, veuillez réessayer.');
        }
    };

    return (
        <View style={styles.overlay}>
            <Card style={styles.card}>
                <Card.Title
                    title={initialDriver ? 'Modifier Conducteur' : 'Ajouter Conducteur'}
                    titleStyle={styles.cardTitle}
                />
                <Card.Content>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <TextInput
                        label="Nom"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Numéro de licence (ex: FR-12345678)"
                        value={licenseNumber}
                        onChangeText={handleLicenseChange}
                        style={styles.input}
                        mode="outlined"
                        maxLength={8}
                    />
                    <TextInput
                        label="Numéro de téléphone (+33 612345678)"
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        style={styles.input}
                        mode="outlined"
                        maxLength={12}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={handleEmailChange}
                        style={styles.input}
                        mode="outlined"
                        keyboardType="email-address"
                    />
                    <Text style={styles.statusText}>Statut: {status}</Text>

                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        loading={loading}
                        disabled={loading}
                    >
                        {initialDriver ? 'Mettre à jour' : 'Ajouter'}
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

export default DriverForm;