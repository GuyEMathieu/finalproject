import * as ActionTypes from './authTypes'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type){
        
        case ActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state, 
                ...action.payload,
                isAuthenticated: true,
                loading: false, 
            }
        case ActionTypes.LOGIN_FAIL:
        case ActionTypes.AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                user: null, 
                errors: action.payload
            }
        case ActionTypes.USER_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state, 
                token: null,
                isAuthenticated: false,
                user: null, 
            }
        case ActionTypes.SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
    
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                errors: state.errors.filter(e => e._id !== action.payload)
            }
        default:
            return state
    }
}