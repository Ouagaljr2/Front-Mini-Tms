import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://10.188.192.249:8080/', // Remplacez par l'URL de votre backend
    //baseURL: 'http://localhost:8080/', // Remplacez par l'URL de votre backend
    baseURL: 'http://10.100.30.99:8080/', // Remplacez par l'URL de votre backend

});

export default api;
