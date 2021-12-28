import {
    REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR,
    LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, LOGOUT, REMOVE_ALERT
} from '../ContextTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
        case LOGIN_ERROR:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                alerts: action.payload,
                user: null
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert._id !== action.payload)
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                alerts: null
            }
        
        default:
            return state
    }
}