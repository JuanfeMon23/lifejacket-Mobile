import axios from '../../api/axios.js'

export const getVehiclesRequest = async () => axios.get('/Vehicles');