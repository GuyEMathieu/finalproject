import * as ActionTypes from '../ActionTypes'
import axios from 'axios';


export const getDefaults = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/api/defaults')

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

export const setLoading = () => dispatch => dispatch({type: ActionTypes.DEFAULT_LOADING})