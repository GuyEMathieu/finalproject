import React, {useState, useContext, useEffect} from 'react';
import {
    Paper, 
    InputAdornment, Button,
    Stack, TextField, Typography
} from '@mui/material';

import Alerts from '../../components/Alerts';
import { AuthContext } from '../../context/auth_context/AuthState';
import { styled } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const CustomerPaper = styled(Paper)(({theme}) => ({
    marginLeft: '30vw',
    marginRight: '30vw',
    marginTop: '25vh',
    backgroundColor: 'silver'
}))


const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {registerUser, errors, clearError, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
        // eslint-disable-next-line
    },[isAuthenticated])

    const [user, setUser] = useState({
        username: 'testUser',
        password: 'password'
    });

    const onRegister = e => {
        registerUser(user)
    }

    const handleChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    return (
        <CustomerPaper>
            <Stack spacing={2}>
                <Typography align='center'>Register</Typography>
                {errors ? <Alerts alerts={errors} removeAlert={clearError} /> : null}
                <TextField
                    label={'Username'} name='username'
                    
                    value={user.username} onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label={'Password'} name='password' type={'password'}
                    value={user.password} onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}    
                />
                <Button onClick={onRegister} >Register</Button>
            </Stack>

        </CustomerPaper>
    )
};

export default Login;
