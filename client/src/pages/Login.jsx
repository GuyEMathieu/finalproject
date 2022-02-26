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

import {loginUser} from '../redux/actions/authActions';
import {getDefaults} from '../redux/actions/defaultActions';

import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        user, isLoading, isSuccess, message, isError
    } = useSelector((state) => state.auth)

    const { defaults } = useSelector((state) => state.defaults)

    const [newUser, setNewUser] = useState(list[1]);

    const [alerts, setAlerts] = useState(null)
    
    useEffect(() => {
        if(isError){
            setAlerts(message)
        }

        if(!defaults){
            dispatch(getDefaults())
        }

        if(user && defaults){
            const pos = defaults.positions.find(p => p._id === user.profile.employmentInfo.position).name
            console.info(pos)
            if(pos === 'Sales Representative'){
                navigate('/sales/showroom')
            } else {
                navigate('/service')
            }
        }

    },[isError, isSuccess, navigate, user, message, dispatch, defaults])

    const handleChange = e => {
        let {name, value} =  e.target;

        if(name ==='label'){
            const _user = list.find(l => l.label === value)
            setNewUser(_user)
            return
        } else {
            setNewUser({...newUser, [name]: value})
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
                            value={newUser.username} onChange={handleChange}
                            disabled={newUser.label !== 'Guest' ? true : false}
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
        username: "Guy.Mathieu",
        label: "Guy Mathieu (Sales Representative)" ,
        password: 'password'
    },
    {
        username: "Horten.Learie",
        label: "Horten Learie (Repair Manager)",
        password: 'password'
    },
    {
        username: "Mercedes.Dunham",
        label: "Mercedes Dunham (Repair Technician)",
        password: 'password'
    },
    {
        username: "",
        label: "Guest",
        password: ''
    },
]

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

export default Login;
