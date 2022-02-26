import axios from 'axios';
const API_URL = '/api/inventoryvehicles';

// Register user
const getInventoryVehicles = async () => {
    const token = localStorage.getItem('token')

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);


    return response.data;
}


const inventoryService = {
    getInventoryVehicles,
}


export default inventoryService;