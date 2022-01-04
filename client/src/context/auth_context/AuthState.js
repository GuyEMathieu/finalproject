import React, {createContext, useReducer } from 'react'
import { v4 as uid } from 'uuid';
import authReducer from './authReducer';
import axios from 'axios';

import {
    REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED,
    LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REMOVE_ALERT
} from '../ContextTypes'

export const AuthContext = createContext();

export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        alerts: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch(err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.alerts
            })
        }
    }

    // Register user
    const registerUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            console.info("Registering user", user )
            const res = await axios.post('/api/users', user, config)
            console.info("new user", res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.alerts
            })
        }

    }

    // Login User
    const loginUser = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', user, config)

            console.info("token ", res.data)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // loadUser();

        } catch(err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.alerts
            })
        }
    }

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    // Clear Errors
    const clearError = () => {

    }

    //removeError
    const removeAlert = id => {
        dispatch({type: REMOVE_ALERT, payload: id})
    }

    const addUIAlert = (_alerts, timeout = 5000) =>{
        let alerts = []
        for(let i = 0; i < _alerts.length; i++){
            const id = uid()
            const _alert = {severity: _alerts[i].severity, msg: _alerts[i].msg, _id: id}

            alerts.push(_alert)

            setTimeout(() => dispatch({
                type: REMOVE_ALERT,
                payload: id
            }), timeout)
        }

        dispatch({
            type: LOGIN_ERROR,
            payload: alerts
        })
    }

    

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                alerts: state.alerts,
                user: state.user,

                loadUser,
                registerUser,
                loginUser,
                logout,
                clearError,
                addUIAlert,
                removeAlert
            }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;