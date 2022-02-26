import React, {useEffect} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import {
    List, Box,ListItem, Button, 
    ButtonGroup, Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';


import {Link, useNavigate} from 'react-router-dom'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import BadgeIcon from '@mui/icons-material/Badge';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CarRentalIcon from '@mui/icons-material/CarRental';

import { useSettings } from '../../hooks/customHooks';

import {getDefaults} from '../../redux/actions/defaultActions'

import {useSelector, useDispatch} from 'react-redux'

function Header(props) {
    const navigate = useNavigate()
    const {user } = useSelector((state) => state.auth)
    const {defaults} = useSelector((state) => state.defaults)
    const dispatch = useDispatch()

    const theme = useTheme();

    useEffect(() => {
        if(!user){
            navigate(`/login`)
        }

        if(!defaults){
            dispatch(getDefaults())
        }
    },[user, navigate, dispatch, defaults])

    const {
        open, handleDrawerClose,
    } = props

    const {changeTheme} = useSettings();

    const showShowroom = () => {
        if(defaults && user){
            const userPosition = user.profile.employmentInfo.position;
            const pos = defaults.positions.find(p => p._id === userPosition);

            if(pos.name === 'Sales Manager' || pos.name === 'Sales Representative'){
                return true
            }
        }
        return false;
    }

    const showCustomers = () => {
        if(defaults && user){
            const userPosition = user.profile.employmentInfo.position;
            const pos = defaults.positions.find(p => p._id === userPosition);

            if(pos.name === 'Repair Manager' || pos.name === 'Repair Technician'){
                return true
            }
        }
        return false
    }

    const showEmployees = () => {
        if(defaults && user){
            const userPosition = user.profile.employmentInfo.position;
            const pos = defaults.positions.find(p => p._id === userPosition);

            if(pos.name.split(' ')[1] === 'Manager'){
                return true
            }
        }
        return false
    }

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon color='primary' /> : <ChevronRightIcon color='primary' />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List
                sx={{ 
                    // height: '100vh',
                    width: '100%', 
                    maxWidth: 360, 
                    bgcolor: 'background.paper', 
                    
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >

                
                {showShowroom() 
                    ?   <CustomLink to={'/sales/showroom'}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CarRentalIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Showroom" />
                            </ListItemButton>
                        </CustomLink>
                    : null
                }

                {showCustomers() 
                    ?   <CustomLink to={'/service'}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CarRepairIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Service" />
                            </ListItemButton>
                        </CustomLink>
                    : null
                }
                {showEmployees() 
                    ?   <CustomLink to={'/hr/employees'}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BadgeIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Employees" />
                            </ListItemButton>
                        </CustomLink>
                    : null
                }
                <Divider />
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    textAlign: 'center',
                    paddingBottom: 3
                }}> 
                    <ListItem>
                        <div>
                            <Typography align='left' >Mode</Typography>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button startIcon={<LightModeOutlinedIcon />} onClick={() => changeTheme('light')}>Light</Button>
                                <Button startIcon={<DarkModeOutlinedIcon />} onClick={() => changeTheme('dark')}>Dark</Button>
                            </ButtonGroup>
                        </div>
                    </ListItem>
                </Box>
            </List>
        </Drawer>
    );
}

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const CustomLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary
}))



export default Header;
