import axios from '../../api/axios.js'

export const loginRequest = async (user) => axios.post('/Login', user);

export const verifyTokenRequest = async () => axios.get('/Verify' );