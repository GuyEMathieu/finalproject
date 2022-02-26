import * as ActionTypes from '../ActionTypes'
import axios from 'axios';


export const getInventory = () => async dispatch => {
    try {
        setLoading();
        const res = await axios.get('/api/inventoryVehicles')

        dispatch({
            type: ActionTypes.GET_INVENTORY,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.INVENTORY_ERROR,
            payload: err.response.data
        })
    }
}

export const getVehicleById = (id) => async dispatch => {
    dispatch({
        type: ActionTypes.CURRENT_VEHICLE,
        payload: id
    })
}

export const setLoading = () => dispatch => dispatch({type: ActionTypes.INVENTORY_LOADING})