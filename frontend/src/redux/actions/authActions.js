import * as ActionTypes from '../ActionTypes';
import axios from 'axios'

export const loginUser = (userData) => async dispatch => {
    try {
        
        setLoading();
        const res = await axios.post('/api/users/login', userData)
        if(res.data){
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        dispatch({
            type: ActionTypes.LOGIN_USER,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.AUTH_ERROR,
            payload: err.response.data
        })
    }
}


export const logout = () => async dispatch => {
    localStorage.removeItem('user')
    dispatch({type: ActionTypes.LOGOUT_USER})
}


export const authReset = () => dispatch => dispatch ({ type: ActionTypes.AUTH_RESET})

export const setLoading = () => dispatch => dispatch ({ type: ActionTypes.AUTH_LOADING})
