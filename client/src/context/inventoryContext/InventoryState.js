import { createContext } from 'react';

import React, {useReducer} from 'react';
import inventoryReducer from './inventoryReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {
    GET_VEHICLES, SET_ALERTS, REMOVE_ALERT, CURRENT_VEHICLE,
    PURCHASE_COMPLETE
} from './inventoryTypes'


export const InventoryContext = createContext();

const InventoryState = props => {
    const initialState = {
        inventoryVehicles: null,
        currentVehicle: null,
        alerts: null,
        receipt: null,
    }

    const [state, dispatch] = useReducer(inventoryReducer, initialState);

    const getVehicles = async () => {

        try {
            const res = await axios.get('/api/inventory/vehicles')
            dispatch({ type: GET_VEHICLES, payload: res.data })
        } catch (err) {
            dispatch({ type: SET_ALERTS, payload: err.response.data.errors })
        }
    }
    const getVehicleById = async (id) => {

        try {
            const res = await axios.get(`/api/inventory/vehicles/${id}`)
            dispatch({ type: CURRENT_VEHICLE, payload: res.data })
        } catch (err) {
            console.info(err)
            dispatch({ type: SET_ALERTS, payload: err.response.data.errors })
        }
    }

    const makeVehiclePurchase = async purchase => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/inventory/vehicles/purchase`, purchase, config)
            dispatch({
                type: PURCHASE_COMPLETE,
                payload: res.data
            })
        } catch (err) {
            console.info(err)
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.alerts
            })
        }
    }

    const removeAlert = async id => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }
    
    const addUIAlert = async (_alerts, timeout = 5000) => {
        for(let i = 0; i < _alerts.length; i++){
            _alerts[i]._id = uid()
            _alerts.push(_alerts[i])
        }

        dispatch({
            type: SET_ALERTS,
            payload: _alerts
        })

        for(let i = 0; i < _alerts.length; i++){
            setTimeout(() => dispatch({
                type: REMOVE_ALERT,
                payload: _alerts[i]._id
            }), timeout)
        }
    }


    return (
        <InventoryContext.Provider
            value= {{
                inventoryVehicles: state.inventoryVehicles,
                currentVehicle: state.currentVehicle,
                alerts: state.alerts,
                receipt: state.receipt,

                addUIAlert,
                removeAlert,
                getVehicles,
                makeVehiclePurchase,
                getVehicleById
            }}>

            {props.children}
        </InventoryContext.Provider>
    )
}

export default InventoryState;