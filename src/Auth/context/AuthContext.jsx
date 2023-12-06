import React, { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from '../api/Auth.js';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../api/axios.js'


export const AuthContext = createContext();


export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
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

    //  useEffect(() => {
    //   let isMounted = true; 
    //   async function checkLogin() {
    //     const tokenString = await AsyncStorage.getItem('token');
    //     const token = JSON.parse(tokenString);
    //     if (!token) {
    //       if (isMounted) {
    //         setIsAutenticated(false);
    //         setLoading(false);
    //         setUser(null);
    //       }
    //     } else {
    //       try {
    //         const res = await verifyTokenRequest(token);
    //         console.log(res)
    //         if (res.data && isMounted) {
    //           setIsAutenticated(true);
    //           setUser(res.data);
    //           setLoading(false);
    //         } else if (isMounted) {
    //           setIsAutenticated(false);
    //           setLoading(false);
    //         }
    //       } catch (error) {
    //         if (isMounted) {
    //           setIsAutenticated(false);
    //           setUser(null);
    //         }
    //       }
    //     }
    //   }
    //   checkLogin();
    //   return () => {
    //   isMounted = false; 
    //   };
    //  }, []);


     const logout = async () => {
      await AsyncStorage.removeItem('token');
      setIsAutenticated(false);
      setUser(null);
     };

    const value = {user, isAutenticated, setIsAutenticated,  loading, login, logout}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext)
};

