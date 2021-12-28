import { createContext } from 'react';

import React, {useReducer} from 'react';
import addressReducer from './addressReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {
    ADD_COUNTRY, ADD_STATE, GET_STATES, GET_COUNTRIES,
    SET_ERROR, REMOVE_ERROR,
} from './addressContext'


export const AddressContext = createContext();

const AddressState = props => {
    const initialState = {
        errors: null,
        states: null,
        countries: null
    }

    const [state, dispatch] = useReducer(addressReducer, initialState);

    const addCountry = async country => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/countries', country, config);
        console.info(res.data)

        try {
            dispatch({
                type: ADD_COUNTRY,
                payload: res.data
            })
        } catch(err){

            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const getCountries = async () => {

        const res = await axios.get('/api/countries');

        try {
            dispatch({
                type: GET_COUNTRIES,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const deleteCountry = async (id) => {

        const res = await axios.delete(`/api/countries/${id}`);

        try {
            dispatch({
                type: GET_COUNTRIES,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const addState = async state => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/states', state, config);

        try {
            dispatch({
                type: ADD_STATE,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const getStates = async () => {
        console.info("CALLING FOR STATES")
 
        const res = await axios.get('/api/states');
        console.info("Results received")

        try {
            dispatch({
                type: GET_STATES,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const deleteState = async (id) => {

        const res = await axios.delete(`/api/states/${id}`);

        try {
            dispatch({
                type: GET_STATES,
                payload: res.data
            })
        } catch(err){
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

    const addUIError = uiErrors => {
        let errors = []
        for(let i = 0; i < uiErrors.length; i++){
            errors.push({severity: 'error', msg: uiErrors[i], _id: uid()})
        }

        dispatch({
            type: SET_ERROR,
            payload: errors
        })
    }

    return (
        <AddressContext.Provider
            value={{
                states: state.states,
                countries: state.countries,
                errors: state.errors,

                removeError,
                addUIError,

                addCountry,
                getCountries,
                deleteCountry,
                addState,
                getStates,
                deleteState
            }}>

            {props.children}
        </AddressContext.Provider>
    )
}

export default AddressState;