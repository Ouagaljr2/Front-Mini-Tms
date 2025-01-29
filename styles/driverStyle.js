// styles/driverStyle.js
import { StyleSheet } from 'react-native';

const driverStyles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Utilisation du mode ligne pour aligner les éléments horizontalement
        flex: 1,
        justifyContent: 'flex-start', // Aligner à gauche
        alignItems: 'flex-start', // Aligner en haut
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        flex: 2, // La liste des conducteurs prend la majeure partie de l'écran
        paddingRight: 20, // Ajouter un peu d'espace entre la liste et le formulaire
        backgroundColor: '#a5a5ad', // Fond blanc pour la liste
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    formContainer: {
        width: '33%', // Utilise un tiers de la largeur de l'écran pour le formulaire
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginTop: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    driverItem: {
        backgroundColor: '#f9f9f9', // Boîte blanche pour chaque conducteur
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between', // Boutons Supprimer et Mettre à jour alignés à droite
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    driverText: {
        fontSize: 16,
        flex: 1, // Permet de donner de l'espace pour le texte avant les boutons
    },
    actionButtons: {
        flexDirection: 'row', // Aligner les boutons horizontalement
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    updateButton: {
        backgroundColor: '#1e90ff',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default driverStyles;
