import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import useRefreshData from '../components/useRefreshData'; // Import du hook personnalisé

const DashboardScreen = () => (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Tableau de Bord</Text>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default DashboardScreen;
