import axios from 'axios';
const API_URL = '/api/defaults';

// Register user
const getDefaults = async () => {
    const response = await axios.post(API_URL);
    return response.data;
}

const defaultService = {
    getDefaults,
}

export default defaultService;