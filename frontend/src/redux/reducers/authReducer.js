import * as ActionTypes from '../ActionTypes'


const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    message: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_USER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload,
            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                isError: false,
                isLoading: false,
                message: null
            }
        case ActionTypes.AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                isError: true,
                message: action.payload
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
