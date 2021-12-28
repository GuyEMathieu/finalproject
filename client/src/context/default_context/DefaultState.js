import { createContext } from 'react';
import React, {useReducer} from 'react';
import defaultReducer from './defaultReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';

import {
    GET_ALL,REMOVE_ALERT, SET_ALERTS, CLEAR_ALERTS
} from './defaultTypes'


export const DefaultContext = createContext();

const DefaultState = props => {
    const initialState = {
        defaults: null,
        alerts: null
    }

    const [state, dispatch] = useReducer(defaultReducer, initialState);

    const getAll = async () => {
        try {
            const res = await axios.get('/api/defaults');
            dispatch({
                type: GET_ALL,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SET_ALERTS
            })
        }
    }

    const removeAlert = async id => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }

    const clearAlerts= () => {
        dispatch({
            type: CLEAR_ALERTS
        })
    }

    return (
        <DefaultContext.Provider
            value={{
                defaults: state.defaults,
                alerts: state.alerts,

                getAll,
                clearAlerts,
                removeAlert
            }}>
            {props.children}
        </DefaultContext.Provider>
    )
}

    export default DefaultState;