import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SettingsState from './context/settings_context/SettingState'

import { Provider } from 'react-redux'
// import {createStore, combineReducers} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'

// import defaultReducer from './redux/reducers/defaultReducer'
// import authReducer from './redux/reducers/authReducer';
// import inventoryReducer from './redux/reducers/inventoryReducer'

// const rootReducer = combineReducers({
//     auth: authReducer,
//     defaults: defaultReducer,
//     inventory: inventoryReducer,

// })
// // Create Redux store
// const store = createStore(rootReducer, composeWithDevTools())
import store from './store'

ReactDOM.render(
    <React.StrictMode>
            <SettingsState>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </LocalizationProvider>
            </SettingsState>
    </React.StrictMode>,
    document.getElementById('root')
);

