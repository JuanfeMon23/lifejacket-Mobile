import axios from "axios";

const conection = axios.create({
    baseURL : 'https://life-jacket-backend-production.up.railway.app/api',
    withCredentials: true
})

export default conection;