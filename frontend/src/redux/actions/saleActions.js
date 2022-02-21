import * as ActionTypes from '../ActionTypes'
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

export const getSales = () => async dispatch => {
    try {
        const res = await axios.get('/api/sales', config)
        dispatch({
            type: ActionTypes.GET_SALES,
            payload: res.data
        })
    } catch(err){
        dispatch({
            type: ActionTypes.SALES_ERROR,
            payload: err.response.data
        })
    }
}

export const addSale = (sale) => async dispatch => {
    try {
        const res = await axios.post('/api/sales', sale, config)
        console.info("res", res.data)
        dispatch({
            type: ActionTypes.ADD_SALE,
            payload: res.data
        })
    } catch(err){
        if(err){
            console.info("err", JSON.stringify(err.response, null, 4))
        }
        
        dispatch({
            type: ActionTypes.SALES_ERROR,
            payload: err.response.data
        })
    }
}

export const resetSalesError = () => dispatch => dispatch({type: ActionTypes.SALES_RESET})
