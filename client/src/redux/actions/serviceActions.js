import * as ActionTypes from '../ActionTypes'
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const getServices = () => async dispatch => {
    try {
        const res = await axios.get('/api/services', config)

        dispatch({
            type: ActionTypes.GET_SERVICE,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.SERVICE_ERROR,
            payload: err.response.data
        })
    }
}

export const resetService = () => dispatch => dispatch({type: ActionTypes.SERVICE_RESET})
