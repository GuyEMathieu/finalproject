import React, {useState, useEffect} from 'react';
import {
    InputAdornment, Button, Stack, TextField, Typography,
    Container, Avatar, Box, 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Loading from '../components/Loading'

import { useSelector, useDispatch } from 'react-redux';
import {registerUser, reset} from '../features/auth/authSlice';


import Copyright from '../components/Copyright';
import Alerts from '../components/Alerts';
import { styled } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';


const CustomContainer = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.default,    
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    position: 'relative'
}))
const CustomerPaper = styled(Container)(({theme}) => ({
    height: '25vh',
    position: 'absolute',
    marginTop: '25vh',
    left: '35vw',
    width: '30vw',   
}))

const StyledAvatar = styled(Avatar)(({theme}) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}))
const Typo = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary
}))


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        user, isLoading, isSuccess, message, isError
    } = useSelector((state) => state.auth)

    


    const [newUser, setUser] = useState({username: 'admin2', password: 'password'});

    const onRegister = e => {
        if(!newUser.username || !newUser.password){

        } else {
            dispatch(registerUser(newUser))
        }
    }

    const [alerts, setAlerts] = useState(null)
    
    useEffect(() => {
        if(isError){
            setAlerts(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    },[isError, isSuccess, navigate, user, message, dispatch])
    
    const handleChange = e => {
        let {name, value} =  e.target;
        setUser({...newUser, [name]: value})
    }

    if(isLoading){
        return <Loading  />
    }
    
    return (
        <CustomContainer>
            <CustomerPaper >
                <Stack direction={'row'} sx={{mb: 0, alignItems: 'center'}} justifyContent='center'>
                    <StyledAvatar >
                        <LockOutlinedIcon />
                    </StyledAvatar>
                    <Typo component="h1" variant="h5" align='center'>
                        Register User
                    </Typo>
                </Stack>    
                {alerts && 
                    <Alerts alerts={alerts} clearAlerts={setAlerts} />
                }
                <Stack spacing={2} sx={{mt: 2}}>

                    <TextField
                        label={'Username'} name='username'
                        value={newUser.username} onChange={handleChange}
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
                        value={newUser.password} onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}    
                    />

                    <Button
                        onClick={onRegister}
                        variant="contained"
                        color="primary"
                    >
                        Register In
                    </Button>
                </Stack>

                <Box mt={2}>
                    <Copyright />
                </Box>
            </CustomerPaper> 
        </CustomContainer>
    )
};

export default Register;
