import { createContext } from 'react';

import React, {useReducer} from 'react';
import bankReducer from './bankReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {ADD_BANK, SET_ERROR, GET_BANKS, REMOVE_ERROR} from './bankContext'


export const BankContext = createContext();

const BankState = props => {
    const initialState = {
        errors: null,
        banks: null,
    }

    const [state, dispatch] = useReducer(bankReducer, initialState);

    const addBank = async bank => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/banks', bank, config);
        console.info(res.data)

        try {
            dispatch({
                type: ADD_BANK,
                payload: res.data
            })
        } catch(err){

            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const getBanks = async () => {

        const res = await axios.get('/api/banks');
        console.info("Bank List received")

        try {
            dispatch({
                type: GET_BANKS,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: SET_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const deleteBank = async (id) => {

        const res = await axios.delete(`/api/banks/${id}`);

        try {
            dispatch({
                type: GET_BANKS,
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

    const clearErrors = () => {
        dispatch({
            type: SET_ERROR,
            payload: null
        })
    }

    return (
        <BankContext.Provider
            value={{
                banks: state.banks,
                errors: state.errors,

                removeError,
                addUIError,
                clearErrors,

                addBank,
                getBanks,
                deleteBank
            }}>

            {props.children}
        </BankContext.Provider>
    )
}

export default BankState;