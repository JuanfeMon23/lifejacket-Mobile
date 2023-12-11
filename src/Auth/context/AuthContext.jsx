import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenPasswordRequest, PasswordRecoveryRequest, resetPasswordRequest  } from '../api/Auth.js';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../api/axios.js'


export const AuthContext = createContext();


export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [isAutenticated, setIsAutenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
      try {
       const res = await loginRequest(data);
       const token = res.data;
       await AsyncStorage.setItem('token', JSON.stringify(token));
       setIsAutenticated(true);
       setUser(res.data);
       Toast.show({
         type : 'success',
         text1 : 'Bienvenido',
         duration : 1500
       });
      } catch (error) {
       console.log(error);
         Toast.show({
           type : 'error',
           duration : 1500,
           text1: error.response.data.message
         });
      }
     };

     const passwordRecovery = async (userEmail) => {
      try {
        await PasswordRecoveryRequest(userEmail),
        Toast.show({
          type : 'success',
          text1: 'Se ha enviado un token a su correo',
          duration : 1500
        })
      } catch (error) {
        console.log(error);
        Toast.show({
          type : 'error',
          duration : 1500,
          text1: error.response.data.message
        });
      }
     }

     const verifyTokenPassword = async (token) => {
      try {
        const res = await verifyTokenPasswordRequest(token);
        setNewPassword(res.data);
        Toast.show({
          type : 'success',
          text1: 'Token valido',
          duration : 1500
        })
      } catch (error) {
        Toast.show({
          type : 'error',
          duration : 1500,
          text1: error.response.data.message
        });
      }
     }

     const resetPassword = async (idUser, password) => {
      try {
        await resetPasswordRequest(idUser, password)
        Toast.show({
          type : 'success',
          text1: 'Contraseña actualizada con exito',
          duration : 1500
        })
      } catch (error) {
        console.log(error)
        Toast.show({
          type : 'error',
          duration : 1500,
          text1: error.response.data.message
        });
      }
     }

     const logout = async () => {
      await AsyncStorage.removeItem('token');
      setIsAutenticated(false);
      setUser(null);
     };

    const value = {user, isAutenticated, setIsAutenticated,  loading, login, logout, passwordRecovery, verifyTokenPassword, resetPassword, newPassword  }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext)
};

