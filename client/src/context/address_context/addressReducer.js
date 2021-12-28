import {
    ADD_STATE, ADD_COUNTRY, SET_ERROR, REMOVE_ERROR, GET_STATES, GET_COUNTRIES
} from './addressContext'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        
        case ADD_COUNTRY:
            return {
                ...state,
                countries: [...state.countries, action.payload]
            }
        case ADD_STATE:
            let states = state.states;
            if(states === null) states = []
            states.push(action.payload);

            return {
                ...state,
                states: states,
            }
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case GET_STATES:
            return {
                ...state,
                states: action.payload,
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