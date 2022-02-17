import { createContext } from 'react';

import React, {useReducer} from 'react';
import baseVehicleReducer from './baseVehicleReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {
    GET_ALL,
    ADD_MANUFACTURER, DELETE_MANUFACTURER, ADD_MODEL,
    DELETE_MODEL, REMOVE_ERROR, SET_ERROR, CLEAR_ERRORS
} from './bvContextTypes'


export const BaseVehicleContext = createContext();

const BaseVehicleState = props => {
    const initialState = {
        manufacturers: null,
        models: null,
        errors: null
    }

    const [state, dispatch] = useReducer(baseVehicleReducer, initialState);

    const getAll = async () => {
  
        try {
            const res = await axios.get('/api/basevehicles');
            dispatch({
                type: GET_ALL,
                payload: res.data

            })
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const deleteManufacturer = async (id) => {
  
        try {
            const res = await axios.delete(`/api/basevehicles/manufacturer/${id}`);
            dispatch({
                type: DELETE_MANUFACTURER,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const addManufacturer = async (manufacturer) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/api/basevehicles/manufacturer`, manufacturer, config);

            dispatch({
                type: ADD_MANUFACTURER,
                payload: res.data
            })
        } catch (err) {
            console.log("errors", err.response.data.errors)
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const addModel = async (model) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            console.info("Adding ", model)
            const res = await axios.post(`/api/basevehicles/model`, model, config);
            console.info("RES: ", res.data)
            dispatch({
                type: ADD_MODEL,
                payload: res.data
            })
        } catch (err) {
            console.log("errors", err.response.data.errors)
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const deleteModel = async (id) => {
        try {
            const res = await axios.delete(`/api/basevehicles/model/${id}`);
            dispatch({
                type: DELETE_MODEL,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const removeError = async id => {
        dispatch({
            type: REMOVE_ERROR,
            payload: id
        })
    }

    const addUIError = async errors => {
        let _errors = [];
        for(let i = 0; i < errors.length; i++){
            _errors.push({severity: 'error', msg: errors[i], _id: uid()})
        }
        dispatch({
            type: SET_ERROR,
            payload: _errors
        })
    }

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <BaseVehicleContext.Provider
            value={{
                manufacturers: state.manufacturers,
                models: state.models,
                errors: state.errors,

                addManufacturer,
                deleteManufacturer,
                addModel,
                deleteModel,
                getAll,
                removeError,
                addUIError,
                clearErrors

            }}>
            {props.children}
        </BaseVehicleContext.Provider>
    )
}

    export default BaseVehicleState;