import {ADD_BANK, SET_ERROR, GET_BANKS, REMOVE_ERROR} from './bankContext'


// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case ADD_BANK:
            let banks = state.banks;
            if(banks === null) banks = []


            return {
                ...state,
                banks: [...banks, action.payload]
            }

        case GET_BANKS:
            return {
                ...state,
                banks: action.payload
            }

        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case REMOVE_ERROR:
            const remaining = state.errors.filter(e => e._id !== action.payload)
            return {
                ...state,
                errors: remaining.length > 0 ? remaining : null
            }
        default:
            return state;
    }
}