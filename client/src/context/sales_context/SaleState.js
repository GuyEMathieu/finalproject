import { createContext } from 'react';

import React, {useReducer} from 'react';
import salesReducer from './salesReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import * as ActionTypes from './salesTypes'
import { prettyAlert } from '../../utils/Formatter';


export const SalesContext = createContext();
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const SaleState = props => {
    const initialState = {
        sales: null,
        errors: null

    }

    const [state, dispatch] = useReducer(salesReducer, initialState);

    const saleVehicle = async (sale) => {
        console.info("Sale\n", sale)
        const res = await axios.post('/api/sales', sale, config);
        console.info(res.data)
        try {
            // dispatch({
            //     type: ActionTypes.SET_ERRORS,
            //     payload: res.data
            // })
        } catch (err){
            dispatch({
                type: ActionTypes.SET_ERRORS,
                payload: err.response.data.errors
            })
        }
    }

    const getVehicleSales = async () => {
        // dispatch({
        //     type: ActionTypes.GET_VEHICLE_SALES,
        //     payload: []
        // })
    }

    const addUIErrors = errors => {
        let _errors = [];
        for(let i = 0; i < errors.length; i++){
            _errors.push({_id: uid(), msg: errors[i].msg, severity: errors[i].severity})
        }
        dispatch({
            type: ActionTypes.SET_ERRORS,
            payload: _errors
        })
    }

    const clearErrors = async => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS
        })
    }

    const removeError = async (id) => {
        dispatch({
            type: ActionTypes.REMOVE_ERROR,
            payload: id
        })
    }


    return (
        <SalesContext.Provider
            value= {{
                sales: state.sales,
                errors: state.errors,


                addUIErrors,
                saleVehicle,
                getVehicleSales,
                clearErrors,
                removeError
            }}>

            {props.children}
        </SalesContext.Provider>
    )
}

export default SaleState;