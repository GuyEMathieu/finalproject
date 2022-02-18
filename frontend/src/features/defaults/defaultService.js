import axios from 'axios';
const API_URL = '/api/defaults';

// get all defaults
const getAll = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// Log out User
const defaultService = {getAll}

export default defaultService;