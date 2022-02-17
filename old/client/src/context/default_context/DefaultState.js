import { createContext } from 'react';
import React, {useReducer} from 'react';
import defaultReducer from './defaultReducer';
import axios from 'axios'
import { v4 as uid } from 'uuid';
import {DEFAULTS} from '../shared/defaults'
import * as ActionTypes from './defaultTypes'


export const DefaultContext = createContext();

const DefaultState = props => {
    const initialState = {
        defaults: null,
        alerts: null,
        currentTheme: 'dark',
    }

    const [state, dispatch] = useReducer(defaultReducer, initialState);

    const getAll = async () => {
        //dispatch({type: ActionTypes.GET_ALL, payload: DEFAULTS})
        try {
            const res = await axios.get('/api/defaults');
            dispatch({
                type: ActionTypes.GET_ALL,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS
            })
        }
    }

    const removeAlert = async id => {
        dispatch({
            type: ActionTypes.REMOVE_ALERT,
            payload: id
        })
    }

    const clearAlerts= () => {
        dispatch({
            type: ActionTypes.CLEAR_ALERTS
        })
    }

    const changeTheme = theme => {
        dispatch({
            type: ActionTypes.CHANGE_THEME,  
            payload: theme
        })
    }

    return (
        <DefaultContext.Provider
            value={{
                defaults: state.defaults,
                alerts: state.alerts,
                firstName: state.firstName,
                currentTheme: state.currentTheme,

                getAll,
                clearAlerts,
                removeAlert,
                changeTheme,
            }}>
            {props.children}
        </DefaultContext.Provider>
    )
}

    export default DefaultState;