import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './app/store'

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import SettingsState from './context/settings_context/SettingState'


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

