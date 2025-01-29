import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions } from 'react-native';
import { addDriver, updateDriver } from '../services/driverService';

const { width } = Dimensions.get('window');

const DriverForm = ({ fetchDrivers, initialDriver = null, onClose }) => {
    const [name, setName] = useState(initialDriver ? initialDriver.name : '');
    const [licenseNumber, setLicenseNumber] = useState(initialDriver ? initialDriver.licenseNumber : 'FR-');
    const [phoneNumber, setPhoneNumber] = useState(initialDriver ? initialDriver.phoneNumber : '+33');
    const [email, setEmail] = useState(initialDriver ? initialDriver.email : '');
    const [status] = useState('Disponible'); // Statut fixe, non modifiable
    const [error, setError] = useState(null); // État pour stocker les erreurs

    // Fonction pour valider et formater le numéro de licence
    const handleLicenseChange = (text) => {
        if (text.length <= 8 && text.startsWith('FR-')) {
            setLicenseNumber(text.toUpperCase()); // Enforcer la casse majuscule
            setError(null); // Réinitialiser l'erreur
        } else {
            setError('Le numéro de licence doit commencer par "FR-" et être de 8 chiffres.');
        }
    };

    // Fonction pour valider et formater le numéro de téléphone
    const handlePhoneChange = (text) => {
        // Si le texte commence par +33 et est suivi de 9 chiffres
        if (text.startsWith('+33') && text.length <= 13 && !isNaN(text.slice(4))) {
            setPhoneNumber(text);
            setError(null); // Réinitialiser l'erreur
        } else if (text.startsWith('+33') && text.length > 13) {
            setError('Le numéro de téléphone ne peut pas dépasser 13 caractères.');
        } else {
            setError('Le numéro de téléphone doit commencer par "+33" suivi de 8 chiffres.');
        }
    };

    // Fonction pour valider l'email avec une expression régulière
    const handleEmailChange = (text) => {
        setEmail(text);
        // Validation de l'email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(text)) {
            setError('L\'email n\'est pas valide.');
        } else {
            setError(null); // Réinitialiser l'erreur
        }
    };

    const handleSubmit = async () => {
        // Vérification si tous les champs sont remplis
        if (!name || !licenseNumber || !phoneNumber || !email) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        const driverData = { name, licenseNumber, phoneNumber, email, status };
        let success;
        if (initialDriver) {
            success = await updateDriver(initialDriver.id, driverData);
        } else {
            success = await addDriver(driverData);
        }

        if (success) {
            fetchDrivers();
            onClose();
        } else {
            setError('Une erreur est survenue, veuillez réessayer.');
        }
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.form}>
                <Text style={styles.title}>{initialDriver ? 'Modifier Conducteur' : 'Ajouter Conducteur'}</Text>

                {/* Affichage de l'erreur */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro de licence (ex: FR-12345678)"
                    value={licenseNumber}
                    onChangeText={handleLicenseChange}
                    maxLength={8}  // Limiter la taille à 8 caractères pour la licence
                />
                <TextInput
                    style={styles.input}
                    placeholder="Numéro de téléphone (+33 612345678)"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    maxLength={12}  // Limiter la taille à 13 caractères pour le téléphone
                    keyboardType="phone-pad" // Permet de faire apparaître le pavé numérique
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <Text style={styles.statusText}>Statut: {status}</Text>

                <Button title={initialDriver ? 'Mettre à jour' : 'Ajouter'} onPress={handleSubmit} />
                {onClose && <Button title="Annuler" color="red" onPress={onClose} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    form: {
        width: '90%',
        position: 'relative',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    statusText: {
        marginBottom: 15,
        color: '#555',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default DriverForm;
