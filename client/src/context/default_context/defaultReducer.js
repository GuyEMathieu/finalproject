import {
    GET_ALL,REMOVE_ALERT, SET_ALERTS, CLEAR_ALERTS
} from './defaultTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                defaults: action.payload
            }
        case SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case CLEAR_ALERTS:
            return {
                ...state,
                alerts: null
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.filter(alert => alert._id === action.payload)
            }
        default:
            return state;
    }
}