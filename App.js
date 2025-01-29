import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importation des écrans
import DriversScreen from './screens/DriversScreen';
import UserScreen from './screens/UserScreen';
import DashboardScreen from './screens/DashboardScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import TripScreen from './screens/TripScreen';
import { isAuthenticated } from './services/userService'; // Fonction pour vérifier l'authentification

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié au démarrage
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'User') iconName = 'person';
              else if (route.name === 'Drivers') iconName = 'directions-car';
              else if (route.name === 'Dashboard') iconName = 'dashboard';
              else if (route.name === 'Vehicles') iconName = 'local-shipping';
              else if (route.name === 'Trips') iconName = 'map';

              return <Icon name={iconName} size={24} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: 'black',
              height: 60,
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="User">
            {(props) => (
              <UserScreen
                {...props}
                onLoginSuccess={() => setIsLoggedIn(true)} // Passe une fonction pour changer l'état global
                onLogout={() => setIsLoggedIn(false)}
              />
            )}
          </Tab.Screen>

          {isLoggedIn && (
            <>
              <Tab.Screen name="Dashboard" component={DashboardScreen} />
              <Tab.Screen name="Drivers" component={DriversScreen} />
              <Tab.Screen name="Vehicles" component={VehiclesScreen} />
              <Tab.Screen name="Trips" component={TripScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
