import {useReducer, createContext} from 'react';
import settingsReducer from './settingsReducer';
import * as ActionTypes from './settingsType'


export const SettingsContext = createContext();

const SettingsState = props => {
    const initialState = {
        currentTheme: 'dark',
    }

    const [state, dispatch] = useReducer(settingsReducer, initialState);


    const changeTheme = theme => {
        dispatch({
            type: ActionTypes.CHANGE_THEME,
            payload: theme
        })
    }

    return (
        <SettingsContext.Provider
            value={{
                currentTheme: state.currentTheme,
                changeTheme,
            }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

    export default SettingsState;