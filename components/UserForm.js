import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/userService';

const UserForm = ({ onLoginSuccess, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const success = await loginUser(username, password);
        setLoading(false);

        if (success) {
            onLoginSuccess();
            console.log('onLoginSuccess appelé avec succès');
        } else {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
            console.log('Login échoué');
        }
    };


    return (
        <View style={styles.container}>
            <>
                <Text style={styles.title}>Se connecter</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button
                    title={loading ? 'Chargement...' : 'Se connecter'}
                    onPress={handleLogin}
                    disabled={loading}
                />
            </>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        marginBottom: 15,
        paddingLeft: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },

});

export default UserForm;
