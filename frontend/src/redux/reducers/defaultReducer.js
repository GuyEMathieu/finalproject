import * as ActionTypes from '../ActionTypes'


const initialState = {
    defaults: null,
    isDefaultError: false,
    isDefaultLoading: false,
    defaultMessage: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.GET_DEFAULTS:
            return {
                ...state,
                defaults: action.payload,
            }

        case ActionTypes.DEFAULT_ERROR:
            return {
                ...state,
                isDefaultError: true,
                defaultMessage: action.payload
            }
        case ActionTypes.DEFAULT_RESET:
            return {
                ...state,
                isError: false,
                isDefaultLoading: false,
                defaultMessage: null
            }
        default:
            return state;
    }
}

export default reducer
