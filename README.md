
# Mini TMS - Frontend
Ce dépôt contient le frontend de l'application Mini TMS, une solution de gestion pour une petite entreprise de transport. Le frontend est développé en React Native pour une application mobile et une interface web.

## Fonctionnalités
- **Gestion des conducteurs** : Ajout, modification, suppression et recherche de conducteurs.
- **Gestion des véhicules** : Ajout, modification, suppression et recherche de véhicules.
- **Gestion des trajets** : Ajout, modification, suppression et recherche de trajets avec filtres.
- **Tableau de bord** : Affichage des statistiques de base.
- **Authentification** : Gestion des utilisateurs avec permissions.
- **Notifications** : Système de notifications pour les trajets (e-mail ou SMS).
- **Intégration API externe** : Calcul des distances avec Google Maps API.

## Technologies utilisées
- **React Native** : Framework pour le développement d'applications mobiles multiplateformes et le développement d'interfaces web.
- **Codemagic** : Automatisation des pipelines CI/CD pour le déploiement mobile.

## Structure du projet

- **`src/components`** : Composants React réutilisables.
- **`src/screens`** : Écrans de l'application mobile.
- **`src/services`** : Services pour interagir avec l'API backend.
- **`src/utils`** : Utilitaires et helpers.

## Prérequis

- Node.js 18+
- npm ou yarn
- Android Studio (pour l'émulation Android)

## Installation

1. Clonez ce dépôt :
   ```sh
   git clone git@github.com:Ouagaljr2/Front-Mini-Tms.git
   cd Front-Mini-Tms
    ```
2.  Installez les dépendances :
    ```sh
    npm install
    ```
3.  Démarrez l'application :
    ```sh
    yarn start
    ```
    Pour l'application mobile, utilisez :
    ```sh
    npx react-native run-android
    ```
    Vous trouverez alors sur votre emulateur l'applicaton lancer.

##   Connexion à l'application
Une fois que l'application est lancée, vous pouvez vous connecter en tant qu'Admin avec les informations suivantes :

   -  Username: admin
   -  Password: admin

##  CI/CD

Le pipeline CI/CD est configuré avec Codemagic. Il exécute les étapes suivantes :

-   Build & Test : Compilation du projet et exécution des tests.
-   Build APK & AAB : Construction des fichiers APK et AAB pour Android.
-   Publishing : Envoi des artefacts par e-mail.

##  Tests
Les tests unitaires sont implémentés avec Jest. Vous pouvez exécuter les tests avec la commande suivante :
```sh
npm test
```
##  Déploiement Mobile et Web
L'application est disponible sur mobile et web. Pour générer un build mobile :
```shS
npm run android
```
##  Auteurs
-   **Ouagal Mahamat**