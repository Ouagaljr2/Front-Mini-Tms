import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { addVehicle, updateVehicle } from '../services/vehicleService';

const VehicleForm = ({ fetchVehicles, initialVehicle = null, onClose }) => {
    const [registrationNumber, setRegistrationNumber] = useState(initialVehicle ? initialVehicle.registrationNumber : 'FR-');
    const [status] = useState('Disponible'); // Statut fixe
    const [model, setModel] = useState(initialVehicle ? initialVehicle.model : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // État pour gérer les erreurs

    const handleRegistrationChange = (text) => {
        // Si le numéro d'immatriculation commence par "FR-" et est suivi de chiffres
        if (text.length <= 10 && text.startsWith('FR-')) {
            const numericPart = text.slice(3); // Partie après "FR-"
            if (/^\d*$/.test(numericPart)) {
                setRegistrationNumber(text.toUpperCase()); // Mettre en majuscules
                setError(null); // Réinitialiser l'erreur
            } else {
                setError('Le numéro d\'immatriculation doit commencer par "FR-" et être suivi uniquement de chiffres.');
            }
        } else if (text.length <= 10) {
            setRegistrationNumber(text.toUpperCase()); // Mettre en majuscules
            setError(null); // Réinitialiser l'erreur
        } else {
            setError('Le numéro d\'immatriculation ne peut pas dépasser 10 caractères.');
        }
    };

    const handleSubmit = async () => {
        // Vérification si tous les champs sont remplis
        if (!registrationNumber || !model) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        const vehicleData = { registrationNumber, status, model };
        let success;
        setLoading(true);
        if (initialVehicle) {
            // Mise à jour du véhicule
            success = await updateVehicle(initialVehicle.id, vehicleData);
        } else {
            // Ajout d'un nouveau véhicule
            success = await addVehicle(vehicleData);
        }
        setLoading(false);

        if (success) {
            fetchVehicles(); // Rafraîchir la liste des véhicules
            onClose(); // Fermer le formulaire
        } else {
            setError('Une erreur est survenue, veuillez réessayer.');
        }
    };

    return (
        <View style={styles.overlay}>
            < View style={styles.formContainer}>
                <Text style={styles.formTitle}>{initialVehicle ? 'Modifier Véhicule' : 'Ajouter Véhicule'}</Text>

                {/* Affichage de l'erreur */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Numéro d'immatriculation (ex: FR-12345678)"
                    value={registrationNumber}
                    onChangeText={handleRegistrationChange}
                    maxLength={10} // Limiter la taille à 10 caractères (FR- et 8 chiffres max)
                />
                <TextInput
                    style={styles.input}
                    placeholder="Modèle"
                    value={model}
                    onChangeText={setModel}
                />
                {/* Affichage du statut, non modifiable */}
                <Text style={styles.statusText}>Statut: {status}</Text>

                <Button
                    title={loading ? 'Chargement...' : (initialVehicle ? 'Mettre à jour' : 'Ajouter')}
                    onPress={handleSubmit}
                    disabled={loading}
                />

                <Button title="Annuler" color="red" onPress={onClose} />
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
    formContainer: {
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
    formTitle: {
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
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default VehicleForm;
