import * as ActionTypes from '../ActionTypes'

const initialState = {
    serviceList: null,
    isServiceError: false,
    isServiceLoading: false,
    saleMessage: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){

        case ActionTypes.GET_SERVICE:
            return {
                ...state,
                serviceList: action.payload,
            }
        case ActionTypes.SERVICE_ERROR:
            return {
                ...state,
                isServiceError: true,
                serviceMessage: action.payload
            }
        case ActionTypes.SERVICE_RESET:
            return {
                ...state,
                isServiceError: false,
                isServiceLoading: false,
                serviceMessage: null
            }
        default:
            return state;
    }
}

export default reducer
