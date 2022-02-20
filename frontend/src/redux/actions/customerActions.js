import * as ActionTypes from '../ActionTypes'
import axios from 'axios';
import { alignProperty } from '@mui/material/styles/cssUtils';

const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const getCustomers = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/api/customers', config)

        dispatch({
            type: ActionTypes.GET_CUSTOMERS,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.CUSTOMER_ERROR,
            payload: err.response.data
        })
    }
}

export const addCustomer = (newCustomer) => async dispatch => {
    try {
        setLoading();
        const res = await axios.post('/api/customers', newCustomer, config)

        dispatch({
            type: ActionTypes.ADD_CUSTOMER,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.CUSTOMER_ERROR,
            payload: err.response.data
        })
    }
}

export const updateCustomer = (changes) => async dispatch => {
    try {
        setLoading();
        const res = await axios.put(`/api/customers/${changes._id}`, changes, config)

        dispatch({
            type: ActionTypes.ADD_CUSTOMER,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.CUSTOMER_ERROR,
            payload: err.response.data
        })
    }
}

export const addNewVehicle = (customerId, vehicle, ) => async dispatch => {
    try {
        const res = await axios.post(`/api/customers/${customerId}/vehicle`, vehicle, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER,
            payload: res.data
        })
    } catch(err){
        dispatch({
            
            type: ActionTypes.CUSTOMER_ERROR,
            payload: err.response.data
        })
    }
}

export const filterCustomers = (search) => dispatch => {
    dispatch({type: ActionTypes.FILTER_CUSTOMERS, payload: search})
}

export const updateVehicle = (vehicle, customerId) => async dispatch => {
    try{
        const res = await axios.put(`/api/customers/${customerId}/vehicle`, vehicle, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER, 
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.CUSTOMER_ERROR, 
            payload: err.response.data
        })
    }
}

export const addVehicleService = (serviceData) => async dispatch => {
    try{
        const res = await axios.post(`/api/customers/${serviceData.customer}/vehicle/${serviceData.vin}/service`, serviceData.newService, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER, 
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.CUSTOMER_ERROR, 
            payload: err.response.data
        })
    }
}

export const resetCustomers = () => dispatch => {
    dispatch({type: ActionTypes.CUSTOMER_RESET})
}

export const resetCustomerError = () => dispatch => {
    dispatch({type: ActionTypes.CUSTOMER_RESET})
}

export const setLoading = () => dispatch => {
    dispatch({type: ActionTypes.DEFAULT_LOADING})
}