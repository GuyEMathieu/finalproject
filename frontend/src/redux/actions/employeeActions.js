import * as ActionTypes from '../ActionTypes'
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const getEmployees = () => async dispatch => {
    try {
        const res = await axios.get('/api/employees', config)

        dispatch({
            type: ActionTypes.GET_EMPLOYEES,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.EMPLOYEE_ERROR,
            payload: err.response.data
        })
    }
}

export const addEmployee = (newEmployee) => async dispatch => {
    try {
        const res = await axios.post('/api/employees', newEmployee, config)

        dispatch({
            type: ActionTypes.ADD_EMPLOYEE,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.EMPLOYEE_ERROR,
            payload: err.response.data
        })
    }
}

export const updateEmployee = (changes) => async dispatch => {
    try {
        const res = await axios.put(`/api/employees/${changes._id}`, changes, config)

        dispatch({
            type: ActionTypes.ADD_EMPLOYEE,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.EMPLOYEE_ERROR,
            payload: err.response.data
        })
    }
}

export const filterEmployees = (search) => dispatch => {
    dispatch({type: ActionTypes.FILTER_EMPLOYEES, payload: search})
}

export const resetEmployees = () => dispatch => {
    dispatch({type: ActionTypes.EMPLOYEE_RESET})
}
