import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans l'application</Text>

            <Text>Bienvenue dans votre application de gestion de transport!</Text>
            <Button title="Gestion des Conducteurs" onPress={() => navigation.navigate('Drivers')} />
            <Button title="Gestion des Utilisateurs" onPress={() => navigation.navigate('User')} />
            <Button title="Tableau de Bord" onPress={() => navigation.navigate('Dashboard')} />
            <Button title="Gestion des Véhicules" onPress={() => navigation.navigate('Vehicles')} />
            <Button title="Gestion des Trajets" onPress={() => navigation.navigate('Trips')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default HomeScreen;


