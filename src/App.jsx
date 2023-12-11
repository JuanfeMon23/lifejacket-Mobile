import { AuthProvider } from './Auth/context/AuthContext.jsx';
import { useAuth } from './Auth/context/AuthContext.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import { ForgotPassword } from './Auth/screen/ForgotPassword.jsx';
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
import { ResetPassword } from './Auth/components/ResetPassword.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticatedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Dashboard' options={{ headerShown: false, 
      tabBarIcon:({}) => (<Icon name='linechart'/>)
    }} component={Dashboard} />
  </Stack.Navigator>
);

const UnauthenticatedNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name='Inicio de sesión'  component={Login } options={{ headerShown: false, 
      tabBarIcon:({}) => (<IconPerson name='users'/>) }} />

    <Tab.Screen name='Contacto' options={{ headerShown: false,
      tabBarIcon:({}) => (<IconContact name='whatsapp'/>)
    }}  component={Contact} />

    <Tab.Screen name='Catalogo' options={{ headerShown: false,
      tabBarIcon:({}) => (<IconCar name='car'/>)
    }} component={Catalogue} />
  </Tab.Navigator>

);

const PasswordRecoveryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Send' options={{headerShown: false, tabBarVisible: false}} component={ForgotPassword} />
      <Stack.Screen name='ResetPassword' options={{headerShown: false, tabBarVisible: false}} component={ResetPassword} />
  </Stack.Navigator>
  )
}



export default function App() {
  const AuthComponent = () => {
   const { isAutenticated } = useAuth();
  
   return (
     <NavigationContainer>
       <Stack.Navigator>
         {isAutenticated ? (
           <Stack.Screen name='Authenticated' component={AuthenticatedNavigator} options={{ headerShown: false }} />
         ) : (
           <>
             <Stack.Screen name='Unauthenticated' component={UnauthenticatedNavigator} options={{ headerShown: false }} />
             <Stack.Screen name='PasswordRecovery' component={PasswordRecoveryNavigator} options={{ headerShown: false }} />
           </>
         )}
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


