import * as ActionTypes from '../ActionTypes'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    message: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                user: action.payload,
            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('user')
            return {
                ...state,
                user: null,
                isError: false,
                isLoading: false,
                message: null
            }
        case ActionTypes.AUTH_ERROR:
            localStorage.removeItem('user')
            return {
                ...state,
                isError: true,
                message: action.payload.message
            }
        case ActionTypes.AUTH_RESET:
            return {
                ...state,
                isError: false,
                isLoading: false,
                message: null
            }
        default:
            return state;
    }
}

export default reducer
