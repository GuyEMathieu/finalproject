import * as ActionTypes from '../ActionTypes'

const initialState = {
    salesList: null,
    isSalesError: false,
    isSalesLoading: false,
    saleMessage: null
}

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
    switch(action.type){

        case ActionTypes.ADD_SALE:
            return {
                ...state,
                salesList: [...state.salesList, action.payload],
            }
        case ActionTypes.GET_SALES:
            return {
                ...state,
                salesList: action.payload,
            }

        case ActionTypes.SALES_ERROR:
            return {
                ...state,
                isSalesError: true,
                saleMessage: action.payload
            }
        case ActionTypes.SALES_RESET:
            return {
                ...state,
                isSalesError: false,
                isSalesLoading: false,
                saleMessage: null
            }
        default:
            return state;
    }
}

export default reducer
