import { createContext } from 'react';
import React, {useReducer} from 'react';
import serviceReducer from './serviceReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import * as ActionTypes from './serviceTypes'

export const ServiceContext = createContext();

const ServiceState = props => {
    const initialState = {
        errors: null,
        services: null,
    }

    const [state, dispatch] = useReducer(serviceReducer, initialState);

    const getServices = async () => {

        const res = await axios.get('/api/services');

        try {
            dispatch({
                type: ActionTypes.GET_ALL,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: ActionTypes.SET_ERRORS,
                payload: err.response.data.errors
            })
        }
    }


    return (
        <ServiceContext.Provider
            value={{
                services: state.services,
                errors: state.errors,

                getServices,
            }}>

            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceState;