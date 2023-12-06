import { AuthProvider } from './Auth/context/AuthContext.jsx';
import { useAuth } from './Auth/context/AuthContext.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Login} from './Auth/screen/Login.jsx'
import { Dashboard } from './Dashboard/screen/Dashboard.jsx';
import { Contact } from './Contact/screen/Contact.jsx';
import {Catalogue} from './catalogue/screen/Catalogue.jsx'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign.js';
import IconCar from 'react-native-vector-icons/FontAwesome5';
import IconPerson from 'react-native-vector-icons/FontAwesome.js';
import IconContact from 'react-native-vector-icons/FontAwesome.js'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name='Dashboard' options={{
      tabBarIcon:({}) => (<Icon name='linechart'/>)
    }} component={Dashboard} />
  </Tab.Navigator>
);

const UnauthenticatedNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name='Inicio de sesión'  component={Login } options={{ headerShown: false, 
      tabBarIcon:({}) => (<IconPerson name='users'/>) }} />

    <Tab.Screen name='Contacto' options={{
      tabBarIcon:({}) => (<IconContact name='whatsapp'/>)
    }}  component={Contact} />

    <Tab.Screen name='Catalogo' options={{
      tabBarIcon:({}) => (<IconCar name='car'/>)
    }} component={Catalogue} />
  </Tab.Navigator>
);



export default function App() {
  const AuthComponent = () => {
    const { isAutenticated } = useAuth();
 
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name='Main' component={isAutenticated ? AuthenticatedNavigator : UnauthenticatedNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    );
  };
 
  return (
    <AuthProvider>
      <AuthComponent />
    </AuthProvider>
  );
 }


