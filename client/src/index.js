import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { ThemeProvider } from '@mui/material/styles';
// import {theme} from './theme'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AuthState from './context/auth_context/AuthState'
ReactDOM.render(
    <React.StrictMode>
        {/* <ThemeProvider theme={theme}> */}
        <AuthState>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <App />
            </LocalizationProvider>
        </AuthState>
        {/* </ThemeProvider> */}
    </React.StrictMode>,
    document.getElementById('root')
);
