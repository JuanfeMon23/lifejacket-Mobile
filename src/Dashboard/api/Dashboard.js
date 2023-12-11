import axios from '../../api/axios';

export const getDashboardSalesRequest = async () => await axios.get(`/Dashboard-mobile/Sales`);

export const getDashboardPurchasesRequest = () => axios.get(`/Dashboard-mobile/Purchases`);

export const getDashboardExchangesRequest = () => axios.get(`/Dashboard-mobile/Exchanges`);

export const getDashboardImprovementsRequest = () => axios.get(`/Dashboard-mobile/Improvements`);

export const getDashboardVehiclesRequest = () => axios.get(`/Dashboard/Vehicles/totalVehicles`);

export const getDashboardExchangesCardRequest = () => axios.get(`/Dashboard/Exchanges/withMonth/Card`);

export const getDashboardSalesCardRequest = () => axios.get(`/Dashboard/Sales/withMonth/Card`);

export const getDashboardPurchasesCardRequest = () => axios.get(`/Dashboard/Purchases/withMonth/Card`);

export const getDashboardImprovementsCardRequest = () => axios.get(`/Dashboard/Improvements/withMonth/Card`);