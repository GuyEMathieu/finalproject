import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AuthState from './context/auth_context/AuthState'
import DefaultState from './context/default_context/DefaultState'
ReactDOM.render(
    <React.StrictMode>
        
        <AuthState>
            <DefaultState>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <App />
                </LocalizationProvider>
            </DefaultState>
        </AuthState>
    </React.StrictMode>,
    document.getElementById('root')
);
