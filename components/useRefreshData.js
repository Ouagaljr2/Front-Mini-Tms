import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Hook personnalisé pour rafraîchir les données à chaque fois qu'un écran devient actif.
 * 
 * @param {Function} fetchData - La fonction à appeler pour récupérer les données
 */
const useRefreshData = (fetchData) => {
    useFocusEffect(
        useCallback(() => {
            fetchData(); // Rafraîchit les données lorsque l'écran devient actif
        }, [fetchData])
    );
};

export default useRefreshData;
