import {useState, useEffect} from 'react';
import {
    Box, CssBaseline, styled,
    Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';

import Header from '../../components/navigations/Header';
import Sidebar from '../../components/navigations/Sidebar';
import Copyright from '../../components/Copyright'
import ClearIcon from '@mui/icons-material/Clear';

import EmployeeSearch from './EmployeeSearch'
import EmployeeProfile from './EmployeeProfile'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    
    ({ theme, open }) => ({
        height: '100vh',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function EmployeeDash() {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [value, setValue] = useState('Employees');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = useState([])
    const createEmployeeTab = employee => {


        if(tabs.filter(t => t.label === `${employee.firstName} ${employee.lastName}`).length == 0) {

            setTabs([...tabs, {
                label: `${employee.firstName} ${employee.lastName}`,
                panel: () => <EmployeeProfile id={employee._id}  />
            }])
            setValue(`${employee.firstName} ${employee.lastName}`)
        } 
        else {
            setValue(`${employee.firstName} ${employee.lastName}`)
        }
    }

    

    const handleCloseCustomerTab = label => {
        const newTabs = tabs.filter(t => t.label !== label)
        setTabs(newTabs)
    }

    useEffect(() => {
        if(tabs.length === 0){
            setValue("Employees");
        }
    },[tabs])

    

    return (
        <Box sx={{ display: 'flex', backgroundColor: "#f5f5f5" }}>
            <CssBaseline />

            <Header open={open} handleDrawerOpen={handleDrawerOpen} title={"Employee Dash"}/>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

            <Main open={open}>
                <DrawerHeader />
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Paper sx={{p:0}}>
                            <TabList onChange={handleChange} >
                                <Tab label='Employees' value='Employees'/>
                                {tabs.map (tab => (
                                    <Tab 
                                        key={tab.label}
                                        icon={ <ClearIcon onClick={() => handleCloseCustomerTab(tab.label)} />}
                                        iconPosition='end'
                                        label={tab.label} value={tab.label}  
                                    />
                                ))}
                            </TabList>
                        </Paper>
                    </Box>
                    <TabPanel value="Employees" sx={{px: 0, py: 0, my: 0}}>
                        <EmployeeSearch createEmployeeTab={createEmployeeTab} />
                    </TabPanel>
                    {tabs.map(tab => (
                        <TabPanel key={tab.label} value={tab.label} sx={{px: 0, py: 0, my: 0}}>
                            {tab.panel()}
                        </TabPanel>
                    ))}
                </TabContext>
                
                <Copyright />
            </Main>
        </Box>
    );
}
