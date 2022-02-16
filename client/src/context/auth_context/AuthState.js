import React, {createContext, useReducer } from 'react'
import { v4 as uid } from 'uuid';
import authReducer from './authReducer';
import axios from 'axios';

import {prettyAlert} from '../../utils/Formatter'
import setAuthToken from '../../utils/setAuthToken';
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
    const loadUser = async () => {
        //@todo - Load token into global headers
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try{
            const res = await axios.get('/api/users');
            dispatch({
                type: ActionTypes.USER_LOADED,
                payload: res.data
            })
        } catch(err){
            
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload: err.response.data.errors
            })
        }
    }

    const loginUser = async user => {
        try{
            const res = await axios.post('/api/users/login', user, config)
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })

            loadUser()
        } catch(err){
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: err.response.data.errors
            })
        }
    }
    const registerUser = async user => {
        try{
            const res = await axios.post('/api/users/register', user, config)
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data
            })

            loadUser()
        } catch(err){
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: err.response.data.errors
            })
        }
    }

    // Login User

    // Logout
    const logout = id => {
        dispatch({
            type: ActionTypes.USER_LOGOUT,
        })
    }

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

                registerUser,
                loginUser,
                loadUser,
                clearError,
                logout
            }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;