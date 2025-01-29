import api from './api'; // Import de l'instance Axios

export const fetchVehicles = async () => {
    try {
        const response = await api.get('/vehicles');
        // Vérifiez que la réponse contient un tableau
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('La réponse n\'est pas un tableau');
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des véhicules :', error);
        return [];
    }
};

export const searchVehicles = async (registrationNumber) => {
    try {
        const response = await api.get('/vehicles/search', {
            params: { registrationNumber },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la recherche des véhicules :', error);
        return [];
    }
};

export const addVehicle = async (vehicle) => {
    try {
        const response = await api.post('/vehicles', vehicle);
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du véhicule :', error);
        return null;
    }
};

export const updateVehicle = async (id, vehicle) => {
    try {
        const response = await api.put(`/vehicles/${id}`, vehicle);
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du véhicule :', error);
        return null;
    }
};

export const deleteVehicle = async (id) => {
    try {
        const response = await api.delete(`/vehicles/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error('Erreur lors de la suppression du véhicule :', error);
        return false;
    }
};
