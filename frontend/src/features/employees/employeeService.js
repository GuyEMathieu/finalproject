import axios from 'axios';
const API_URL = '/api/employees';

// Register user
const getEmployeeList = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data;
}


// Log out User
const employeeService = {
    getEmployeeList, 
}

export default employeeService;