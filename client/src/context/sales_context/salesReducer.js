import * as ActionTypes from './salesTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) =>{
    switch(action.type){
        case ActionTypes.VEHICLE_SALE:
            return {
                ...state,
                sales: [...state.sales || [], action.payload]
            }
        case ActionTypes.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case ActionTypes.REMOVE_ERROR:
            const alerts = state.errors.filter(error => error._id !== action.payload)
            return {
                ...state,
                errors: alerts.length > 0 ? alerts : null
            }
        default:
            return state
    }
}