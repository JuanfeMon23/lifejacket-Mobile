import axios from '../../api/axios.js'

export const loginRequest = async (user) => axios.post('/Login', user);

export const verifyTokenRequest = async () => axios.get('/Verify' );

export const PasswordRecoveryRequest = async (userEmail) => axios.post('/Password', userEmail);

export const verifyTokenPasswordRequest = async (token) => axios.post('/Verify-token-password', token);

export const resetPasswordRequest = async (idUser, password) => axios.patch(`/ResetPassword/${idUser}`, password );