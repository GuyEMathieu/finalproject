import React, {createContext, useReducer } from 'react'
import { v4 as uid } from 'uuid';
import authReducer from './authReducer';
import axios from 'axios';

import {prettyAlert} from '../../utils/Formatter'

import * as ActionTypes from './authTypes'

export const AuthContext = createContext();


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        errors: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Load User

    // Register User
    const loginUser = async user => {
        try{
            const res = await axios.post('/api/users', user, config)
            prettyAlert(res.data)
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })
        } catch(err){
            console.info(err.response.data)
            dispatch({
                type: ActionTypes.SET_ERRORS,
                payload: err.response.data.errors
            })
        }
    }

    // Login User

    // Logout

    // Clear Errors
    const clearError = id => {
        dispatch({
            type: ActionTypes.CLEAR_ERROR,
            payload: id
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                errors: state.errors,
                user: state.user,


                loginUser,
                clearError
            }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;