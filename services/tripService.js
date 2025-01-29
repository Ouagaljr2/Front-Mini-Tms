import api from './api'; // Importer l'instance Axios

export const fetchTrips = async () => {
    try {
        const response = await api.get('/trips');
        return response.data;
    } catch (error) {
        console.error('Error fetching trips:', error);
        return [];
    }
};

export const searchTrips = async (origin, destination) => {
    try {
        const response = await api.get(`/trips/search?origin=${origin}&destination=${destination}`);
        return response.data;
    } catch (error) {
        console.error('Error searching trips:', error);
        return [];
    }
};

export const addTrip = async (trip, driverId, vehicleId) => {
    try {
        const response = await api.post(`/trips?driverId=${driverId}&vehicleId=${vehicleId}`, trip);
        console.log('Response on est ici:', response);
        return response.status === 200;
    } catch (error) {
        console.error('Error adding trip:', error);
        return false;
    }
};

export const updateTrip = async (id, trip) => {
    console.log('Update trip:', trip);
    try {
        const response = await api.put(`/trips/${id}`, trip);
        return response.status === 200;
    } catch (error) {
        console.error('Error updating trip:', error);
        return false;
    }
};

export const deleteTrip = async (id) => {
    try {
        const response = await api.delete(`/trips/${id}`);
        return response.status === 200;
    } catch (error) {
        console.error('Error deleting trip:', error);
        return false;
    }
};
