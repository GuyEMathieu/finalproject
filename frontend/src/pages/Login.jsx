import React, {useState, useEffect} from 'react';
import {
    MenuItem,
    InputAdornment, Button, Stack, TextField, Typography,
    Container, Avatar, Box, 
} from '@mui/material';
import Copyright from '../components/Copyright';
import Alerts from '../components/Alerts';
import { styled } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from 'react-redux';
import {loginUser, reset} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

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


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        user, isLoading, isSuccess, message, isError
    } = useSelector((state) => state.auth)

    const [newUser, setNewUser] = useState(list[1]);

    const [alerts, setAlerts] = useState(null)
    
    useEffect(() => {
        if(isError){
            setAlerts(message)
        }

        if(isSuccess || user){
            navigate('/sales/showroom')
        }

        dispatch(reset())
    },[isError, isSuccess, navigate, user, message, dispatch])

    const handleChange = e => {
        let {name, value} =  e.target;

        if(name ==='label'){
            const _user = list.find(l => l.label === value)
            setNewUser(_user)
        } else {
            setNewUser({...newUser, [name]: value})
            console.info(name, value)
        }
        
    }
    const onLogin = e => {
        dispatch(loginUser({username: newUser.username, password: newUser.password}))
    }
    
    return (
        <CustomContainer>
            <CustomerPaper >
                <Stack direction={'row'} sx={{mb: 0, alignItems: 'center'}} justifyContent='center'>
                    <StyledAvatar >
                        <LockOutlinedIcon />
                    </StyledAvatar>
                    <Typo component="h1" variant="h5" align='center'>
                        Sign in
                    </Typo>
                </Stack>    

                {alerts && 
                    <Alerts alerts={alerts} clearAlerts={setAlerts} />
                }
                
                {isLoading ? <Loading  /> : 
                    <Stack spacing={2} sx={{mt: 2}}>
                        <TextField
                            label='Select A User' value={newUser.label} select
                            onChange={handleChange} name='label'
                        >
                            {list.map(ele => (
                                <MenuItem key={ele.username} value={ele.label}>{ele.label}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label={'Username'} name='username'
                            value={newUser.username} disabled={newUser.label !== 'Guest' ? true : false}
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
                            disabled={newUser.label !== 'Guest' ? true : false}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}    
                        />

                        <Button
                            onClick={onLogin}
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </Stack>
                }

                <Box mt={2}>
                    <Copyright />
                </Box>
            </CustomerPaper> 
        </CustomContainer>
    )
};

    const list = [
        {
            username: "Steve.Pudge",
            label: "Steve Pudge (Sales Manager)",
            password: 'password'
        },
        {
            username: "Giffy.Willsmore",
            label: "Giffy Willsmore (Sales Representative)" ,
            password: 'password'
        },
        {
            username: "Horten.Learie",
            label: "Horten Learie (Repair Manager)",
            password: 'password'
        },
        {
            username: "Omero.Lathwell",
            label: "Omero Lathwell (Repair Technician)",
            password: 'password'
        },
        {
            username: "",
            label: "Guest",
            password: ''
        },
    ]

export default Login;
