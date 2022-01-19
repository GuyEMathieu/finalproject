import { createContext } from 'react';

import React, {useReducer} from 'react';
import customerReducer from './customerReducer';
import axios from 'axios'
import {CUSTOMERS} from '../shared/customers'
import * as ActionTypes from './customerContextTypes'
import { v4 as uid } from 'uuid'; 

export const CustomerContext = createContext();

const CustomerState = props => {
    const initialState = {
        customerList: CUSTOMERS,
        currentCustomer: null,
        alerts: null,
        filteredCustomers: null
    }

    const [state, dispatch] = useReducer(customerReducer, initialState);

    const getCustomers = async () => {
        dispatch({ type: ActionTypes.GET_ALL, payload: CUSTOMERS})

        // try {
        //     const res = await axios.get('/api/customers')
        //     dispatch({
        //         type: ActionTypes.GET_ALL,
        //         payload: res.data
        //     })
        // } catch (err) {
        //     console.info(err)
        //     dispatch({
        //         type: ActionTypes.SET_ALERTS,
        //         payload: err.response.data.errors
        //     })
        // }
    }

    const addNewVehicle = async (vehicle) => {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        // try {
        //     console.info("Sending New Vehicle to server for customer id: ", vehicle.customerId)
        //     const res = await axios.post(`/api/customers/${vehicle.customerId}/vehicle`, vehicle, config)
        //     console.info("RES", res.data)
        //     dispatch({
        //         type: ActionTypes.UPDATE_CUSTOMER,
        //         payload: res.data
        //     })
        // } catch (err) {
        //     console.info(err)
        //     dispatch({
        //         type: ActionTypes.SET_ALERTS,
        //         payload: err.response.data.errors
        //     })
        // }
        dispatch({
            type: ActionTypes.ADD_VEHICLE,
            payload: vehicle
        })
    }
    const addCustomer = async customer => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/customers', customer, config)
            console.info("RES", res.data)
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

    const addVehicleService = async (data) => {
        data.newService.tripId = uid()
        dispatch({
            type: ActionTypes.ADD_SERVICE,
            payload: data
        })

    }

    return (
        <CustomerContext.Provider
            value= {{
                customerList: state.customerList,
                currentCustomer: state.currentCustomer,
                alerts: state.alerts,
                filteredCustomers: state.filteredCustomers,
                quickView: state.quickView,

                addVehicleService,

                addNewVehicle,
                filterCustomers,
                getCustomerById,
                addCustomer,
                getCustomers,
                removeAlert,
            }}>

            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerState;