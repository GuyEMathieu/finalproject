import { createContext } from 'react';

import React, {useReducer} from 'react';
import customerReducer from './customerReducer';
import axios from 'axios'
import * as ActionTypes from './customerContextTypes'
import { v4 as uid } from 'uuid'; 
import { prettyAlert } from '../../utils/Formatter';

export const CustomerContext = createContext();


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const CustomerState = props => {
    const initialState = {
        customerList: null,
        currentCustomer: null,
        alerts: null,
        filteredCustomers: null
    }

    const [state, dispatch] = useReducer(customerReducer, initialState);

    const getCustomers = async () => {

        try {
            const res = await axios.get('/api/customers')
            dispatch({
                type: ActionTypes.GET_ALL,
                payload: res.data
            })
        } catch (err) {
            console.info(err)
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const addCustomer = async customer => {
        try {
            prettyAlert(customer)
            const res = await axios.post('/api/customers', customer, config)
            dispatch({
                type: ActionTypes.ADD_CUSTOMER,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const updateCustomer = async changes => {
        
        const res = await axios.put(`/api/customers/${changes._id}`, changes, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER,
            payload: res.data
        })
    }

    const addNewVehicle = async (customerId, vehicle) => {
        try {
            const res = await axios.post(`/api/customers/${customerId}/vehicle`, vehicle, config)
            alert(JSON.stringify(res.data, null, 4))
            dispatch({
                type: ActionTypes.UPDATE_CUSTOMER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const updateVehicle = async (customerId, vehicle) => {
        try {
            const res = await axios.put(`/api/customers/${customerId}/vehicle`, vehicle, config)
            dispatch({
                type: ActionTypes.UPDATE_CUSTOMER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const addVehicleService = async (data) => {
        try {
            const res = await axios.post(`/api/customers/${data.customer}/vehicle/${data.vin}/service`, data.newService , config)
            prettyAlert(res.data)
            dispatch({
                type: ActionTypes.UPDATE_CUSTOMER,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    

    const filterCustomers = async criteria => {
        dispatch({
            type: ActionTypes.FILTER_CUSTOMERS,
            payload: criteria
        })
    }

    const removeAlert = async id => {
        dispatch({
            type: ActionTypes.REMOVE_ALERT,
            payload: id
        })
    }

    const getCustomerById = id => {
        dispatch({
            type: ActionTypes.CURRENT_CUSTOMER, payload: id
        })
    }

    // const addVehicleService = async (data) => {
    //     data.newService.tripId = uid()
    //     dispatch({
    //         type: ActionTypes.ADD_SERVICE,
    //         payload: data
    //     })
    // }

    return (
        <CustomerContext.Provider
            value= {{
                customerList: state.customerList,
                currentCustomer: state.currentCustomer,
                alerts: state.alerts,
                filteredCustomers: state.filteredCustomers,
                quickView: state.quickView,

                addCustomer,
                getCustomers,
                updateCustomer,
                filterCustomers,
                getCustomerById,

                updateVehicle,
                addVehicleService,
                addNewVehicle,
                
                removeAlert,
            }}>

            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerState;