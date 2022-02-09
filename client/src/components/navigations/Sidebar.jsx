import {useState, useEffect, useContext} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
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

import Popup from '../Popup'

import {Link} from 'react-router-dom'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import CarRentalIcon from '@mui/icons-material/CarRental';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from '../Settings';

import {DefaultContext} from '../../context/default_context/DefaultState';

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
    const defaultContext = useContext(DefaultContext);
    const {settings, updateSettings} = defaultContext;

    const theme = useTheme();

    const {
        open, handleDrawerClose
    } = props

    const [openAdmin, setOpenAdmin] = useState(false)
    const handleClick = () => {
        setOpenAdmin(!openAdmin);
    };

    const [currentSettings, setCurrentSettings] = useState(settings)

    const handleSettingsChange = e => {
        const {checked, name} = e.target;
        alert(JSON.stringify(e.target))
        // setCurrentSettings(prev => {
        //     return {
        //         ...prev,
        //         [name]: checked
        //     }
        // })
    }


    const [openPopup, setOpenPopup] = useState(false)
    const handleOpenPopup = () => setOpenPopup(true);
    const handleClosePopup = () => {
        updateSettings(currentSettings)
        setOpenPopup(false)
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



                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                    {openAdmin ? <ExpandLess color='primary'/> : <ExpandMore color='primary'/>}
                </ListItemButton>


                <Collapse in={openAdmin} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* <CustomLink to={'/hr/employees'}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <BadgeIcon color='primary'/>
                                </ListItemIcon>
                                <ListItemText primary="Employees" />
                            </ListItemButton>
                        </CustomLink> */}
                    </List>
                </Collapse>

                <Divider  />

                <ListItemButton sx={{marginTop: 1}} onClick={handleOpenPopup}>
                    <ListItemIcon>
                        <SettingsIcon color='primary'/>
                    </ListItemIcon>
                    <ListItemText primary="Setting" />
                </ListItemButton>
            </List>

            <Popup open={openPopup} handleClose={handleClosePopup} title={'Settings'}>
                <Settings settings={currentSettings} handleChange={handleSettingsChange} />
            </Popup>
        </Drawer>
    );
}
