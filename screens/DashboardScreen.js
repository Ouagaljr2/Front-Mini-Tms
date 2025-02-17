import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper'; // Composants UI de React Native Paper
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour les icônes

import { fetchDashboardStats } from '../services/dashboardService';

const DashboardScreen = () => {
    const [stats, setStats] = useState({ totalDrivers: 0, totalVehicles: 0, totalTrips: 0 });
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme(); // Utilisation du thème pour les couleurs

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Erreur lors du chargement des statistiques:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Tableau de bord</Title>

            {/* Carte pour les véhicules */}
            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Icon name="car" size={40} color={colors.primary} />
                    <Title style={styles.cardTitle}>Véhicules</Title>
                    <Text style={styles.cardValue}>{stats.totalVehicles}</Text>
                </Card.Content>
            </Card>

            {/* Carte pour les conducteurs */}
            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Icon name="account" size={40} color={colors.primary} />
                    <Title style={styles.cardTitle}>Conducteurs</Title>
                    <Text style={styles.cardValue}>{stats.totalDrivers}</Text>
                </Card.Content>
            </Card>

            {/* Carte pour les trajets */}
            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Icon name="map-marker-path" size={40} color={colors.primary} />
                    <Title style={styles.cardTitle}>Trajets</Title>
                    <Text style={styles.cardValue}>{stats.totalTrips}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 3, // Ombre pour un effet 3D
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardValue: {
        fontSize: 24,
        color: '#6200ee', // Couleur primaire
        marginTop: 5,
    },
    loadinContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;