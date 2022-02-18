import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import {  useSettings } from './hooks/customHooks';
import { ThemeProvider } from '@mui/material/styles';
import {lightTheme} from './themes/lightTheme'
import {darkTheme} from './themes/darkTheme'

import Login from './pages/Login'
import Register from './pages/Register'

import Showroom from './pages/sales/Showroom'

function App() {
    const {currentTheme} = useSettings()
    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}> 
            <Router>
                <Routes>
                    <Route path='/' element={<Showroom />} />
                    <Route path='/sales/showroom' element={<Showroom />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
                
            </Router>
            
        </ThemeProvider>
    );
}

export default App;


