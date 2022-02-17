import * as ActionTypes from './defaultTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.GET_ALL:
            return {
                ...state,
                defaults: action.payload
            }
        case ActionTypes.SET_ALERTS:
            return {
                ...state,
                alerts: action.payload
            }
        case ActionTypes.CLEAR_ALERTS:
            return {
                ...state,
                alerts: null
            }
        case ActionTypes.CHANGE_THEME:
            return {
                ...state,
                currentTheme: action.payload
            }
        case ActionTypes.REMOVE_ALERT:
            return {
                ...state,
                alerts: state.filter(alert => alert._id === action.payload)
            }
        default:
            return state;
    }
}