import axios from '../../api/axios';

export const getDashboardSalesRequest = async () => await axios.get(`/Dashboard/Sales/withMonth`);

export const getDashboardPurchasesRequest = () => axios.get(`/Dashboard/Purchases/withMonth`);

export const getDashboardExchangesRequest = () => axios.get(`/Dashboard/Exchanges/withMonth`);

export const getDashboardImprovementsRequest = () => axios.get(`/Dashboard/Improvements/withMonth`);

export const getDashboardVehiclesRequest = () => axios.get(`/Dashboard/Vehicles/totalVehicles`);

export const getDashboardExchangesCardRequest = () => axios.get(`/Dashboard/Exchanges/withMonth/Card`);

export const getDashboardSalesCardRequest = () => axios.get(`/Dashboard/Sales/withMonth/Card`);

export const getDashboardPurchasesCardRequest = () => axios.get(`/Dashboard/Purchases/withMonth/Card`);

export const getDashboardImprovementsCardRequest = () => axios.get(`/Dashboard/Improvements/withMonth/Card`);