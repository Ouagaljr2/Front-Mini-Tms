import AsyncStorage from '@react-native-async-storage/async-storage'; // Importer AsyncStorage
import api from './api'; // Importer l'instance Axios

// Fonction pour créer un utilisateur (POST)
export const createUser = async (user) => {
    try {
        const response = await api.post('/users/register', user);
        return response.data; // Retourner l'utilisateur créé
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Vérification du code d'erreur 400 (Bad Request) qui signifie que le username existe déjà
            console.error('Erreur lors de la création de l\'utilisateur :', error.response.data);
            // Vous pouvez ici retourner un message d'erreur spécifique au frontend
            return { error: error.response.data };  // Par exemple, retournez l'erreur sous forme d'objet
        }
        console.error('Error creating user:', error);
        return null;
    }
};

// Fonction pour se connecter (POST)
export const loginUser = async (username, password) => {
    try {
        console.log('Envoi de la requête de connexion avec les données suivantes:', { username, password });

        // Effectuer la requête POST vers l'API
        const response = await api.post('/users/login', { username, password });

        console.log('Réponse de la requête de connexion:', response);

        // Vérifiez si la connexion est réussie
        if (response.status === 200 && response.data === true) {
            // Sauvegarder le username dans AsyncStorage
            await AsyncStorage.setItem('username', username);

            console.log('Connexion réussie, utilisateur sauvegardé.');
            return true; // Retourner `true` pour indiquer le succès
        } else {
            console.warn('Connexion échouée :', response.data);
            return false; // Retourner `false` pour indiquer un échec
        }
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:', error.message || error);
        return false; // Gérer les erreurs (exemple : serveur indisponible)
    }
};

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getUserInfo = async (username = null) => {
    try {
        if (!username) {
            // Récupérer le username depuis AsyncStorage si non fourni
            username = await AsyncStorage.getItem('username');
        }

        if (username) {
            // Appel API pour récupérer les informations utilisateur
            const response = await api.get('/users/getUser', {
                params: { username }, // Transmettre le paramètre `username`
            });
            console.log('Informations utilisateur récupérées :', response.data);
            return response.data; // Retourner les informations de l'utilisateur
        } else {
            console.error('Aucun username trouvé dans AsyncStorage.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
        return null;
    }
};


// Fonction pour se déconnecter (supprimer le token)
export const logoutUser = async () => {
    await AsyncStorage.removeItem('username'); // Supprimer le username
    console.log('Utilisateur déconnecté avec succès.');
};


// Fonction pour vérifier si un utilisateur est authentifié
export const isAuthenticated = async () => {
    // Vérifie si un username est stocké dans AsyncStorage
    const username = await AsyncStorage.getItem('username');
    return username !== null;
};
