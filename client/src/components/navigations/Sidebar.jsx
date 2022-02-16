import React, {useState} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import {
    List, Box, ListItemAvatar, 
    Avatar, ListItem, Button, ButtonGroup
} from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {Link, useNavigate} from 'react-router-dom'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

import BadgeIcon from '@mui/icons-material/Badge';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';




import { useAuth, useDefault } from '../../hooks/customHooks';

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


export default function Header(props) {
    const navigate = useNavigate()
    const {user, logout} = useAuth()

    const theme = useTheme();

    const {
        open, handleDrawerClose
    } = props

    const [openSetting, setOpenSettings] = useState(false)
    const handleClick = () => {
        setOpenSettings(!openSetting);
    };

    const goToProfile = () => {
        navigate(`/hr/employees/profile/${user.profile._id}`)
    }

    const handleLogout = () => {
        logout();
        navigate(`/login`)
    }

    const {changeTheme} = useDefault();

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

                <CustomLink to={'/sales/showroom'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CarRentalIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary="Showroom" />
                    </ListItemButton>
                </CustomLink>

                <CustomLink to={'/service'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CarRepairIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary="Service" />
                    </ListItemButton>
                </CustomLink>

                <CustomLink to={'/hr/employees'}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BadgeIcon color='primary'/>
                        </ListItemIcon>
                        <ListItemText primary="Employees" />
                    </ListItemButton>
                </CustomLink>

                <Divider />
            
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                textAlign: 'center',
                paddingBottom: 3
            }}>
 
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <SettingsIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                    {openSetting ? <ExpandMore color='primary'/> : <ExpandLess color='primary'/>}
                </ListItemButton>

                    <Collapse in={openSetting} timeout="auto" unmountOnExit>
                        <List component="div" sx={{pl: 3}}>
                            <ListItemAvatar >
                                <Avatar 
                                    alt={`${user.profile.firstName} ${user.profile.lastName}`} 
                                    src={user.profile.avatar} 
                                    sx={{width: '100px',
                                        height: '100px', 
                                        mx: 'auto',
                                    }}
                                />
                                <ListItemText>{user.profile.firstName} {user.profile.lastName}</ListItemText>
                            </ListItemAvatar>

                            <ListItemButton onClick={() => goToProfile()}>
                                <ListItemIcon>
                                    <AccountCircleIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>

                            <ListItem>
                                <div>
                                    <ListItemText primary={'Mode'} sx={{borderColor: 'black'}}/>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button startIcon={<LightModeOutlinedIcon />} onClick={() => changeTheme('light')}>Light</Button>
                                        <Button startIcon={<DarkModeOutlinedIcon />} onClick={() => changeTheme('dark')}>Dark</Button>
                                    </ButtonGroup>
                                </div>
                            </ListItem>

                            <Divider />

                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider  />
                </Box>
            </List>
        </Drawer>
    );
}
