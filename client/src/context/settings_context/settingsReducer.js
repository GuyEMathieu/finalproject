import * as ActionTypes from './settingsType'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_THEME:
            return {
                ...state,
                currentTheme: action.payload
            }
        default:
            return state;
    }
}