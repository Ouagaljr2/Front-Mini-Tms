import axios from 'axios';

const api = axios.create({

    //baseURL: 'http://10.192.12.42:8080/', // Remplacez par l'URL de votre backend
    baseURL: 'http://10.100.18.111:8080/', // Remplacez par l'URL de votre backend

    //baseURL: 'http://localhost:8080/', // Pour faire marcher sur android studio il faut mettre l'adresse ip de votre machine

});

export default api;
