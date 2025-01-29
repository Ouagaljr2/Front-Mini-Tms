import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getUserInfo, logoutUser, isAuthenticated } from '../services/userService';
import UserForm from '../components/UserForm';
import { createUser } from '../services/userService';

const UserScreen = ({ onLoginSuccess, onLogout }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            setError('');
            if (await isAuthenticated()) {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        onLogout();
    };

    const handleLoginSuccess = async () => {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        onLoginSuccess();
    };

    const toggleCreateUserForm = () => {
        setShowCreateUser(!showCreateUser);
    };

    const handleCreateUser = async () => {
        const user = { username: newUsername, password: newPassword, role };
        const createdUser = await createUser(user);
        if (createdUser) {
            Alert.alert('Succès', 'Utilisateur créé avec succès');
            setShowCreateUser(false);
            setNewUsername('');
            setNewPassword('');
            setRole('');
        } else {
            Alert.alert('Erreur', 'La création de l\'utilisateur a échoué');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ea" />
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Bienvenue, {user.username}!</Text>
                    <Text style={styles.infoText}>Nom d'utilisateur: {user.username}</Text>
                    <Text style={styles.infoText}>Rôle: {user.role}</Text>

                    {user.role === 'Admin' && (
                        <>
                            <TouchableOpacity style={styles.primaryButton} onPress={toggleCreateUserForm}>
                                <Text style={styles.buttonText}>Ajouter un utilisateur</Text>
                            </TouchableOpacity>
                            <Modal
                                visible={showCreateUser}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={() => setShowCreateUser(false)}
                            >
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Créer un nouvel utilisateur</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nom d'utilisateur"
                                            value={newUsername}
                                            onChangeText={setNewUsername}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Mot de passe"
                                            secureTextEntry
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Rôle"
                                            value={role}
                                            onChangeText={setRole}
                                        />
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.cancelButton}
                                                onPress={() => setShowCreateUser(false)}
                                            >
                                                <Text style={styles.buttonText}>Annuler</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.createButton}
                                                onPress={handleCreateUser}
                                            >
                                                <Text style={styles.buttonText}>Créer</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </>
                    )}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <UserForm onLoginSuccess={handleLoginSuccess} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6200ea',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#555',
    },
    primaryButton: {
        backgroundColor: '#6200ea',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    logoutButton: {
        backgroundColor: '#d32f2f',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    createButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
});

export default UserScreen;
