import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <App />
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
