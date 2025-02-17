import api from './api'; // Importer l'instance Axios

/**
 * Récupère les statistiques du tableau de bord.
 * @returns {Promise<Object>} Un objet contenant le total des conducteurs, véhicules et trajets.
 */
export const fetchDashboardStats = async () => {
    try {
        const response = await api.get('/dashboard/stats');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        return { totalDrivers: 0, totalVehicles: 0, totalTrips: 0 }; // Valeurs par défaut en cas d'erreur
    }
};
