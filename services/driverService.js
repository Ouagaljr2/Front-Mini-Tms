import api from './api'; // Importer l'instance Axios

export const fetchDrivers = async () => {
    try {
        const response = await api.get('/drivers');
        // Vérifiez que la réponse contient un tableau
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('La réponse n\'est pas un tableau');
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des conducteurs:', error);
        return [];
    }
};

export const searchDrivers = async (name) => {
    try {
        const response = await api.get(`/drivers/search?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recherche des conducteurs:', error);
        return [];
    }
};

export const addDriver = async (driver) => {
    try {
        const response = await api.post('/drivers', driver);
        return response.status === 200;
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un conducteur:', error);
        return false;
    }
};

export const updateDriver = async (id, driver) => {
    try {
        const response = await api.put(`/drivers/${id}`, driver);
        return response.status === 200;
    } catch (error) {
        console.error('Erreur lors de la mise à jour d\'un conducteur:', error);
        return false;
    }
};

export const deleteDriver = async (id) => {
    try {
        const response = await api.delete(`/drivers/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error('Erreur lors de la suppression d\'un conducteur:', error);
        return false;
    }
};
