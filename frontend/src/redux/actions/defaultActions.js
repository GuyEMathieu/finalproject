import * as ActionTypes from '../ActionTypes'
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const getDefaults = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/api/defaults', config)

        dispatch({
            type: ActionTypes.GET_DEFAULTS,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.DEFAULT_ERROR,
            payload: err.response.data
        })
    }
}



export const resetDefaultError = () => dispatch => dispatch({type: ActionTypes.DEFAULT_RESET})
export const setLoading = () => dispatch => dispatch({type: ActionTypes.DEFAULT_LOADING})