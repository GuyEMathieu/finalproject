import {useState, useEffect} from 'react';
import {
    Box,
    Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';


import ClearIcon from '@mui/icons-material/Clear';

import EmployeeMain from './EmployeeMain';
import EmployeeSearch from './EmployeeSearch'
import MainContainer from '../../components/MainContainer'
import { getName, prettyAlert } from '../../utils/Formatter';

export default function EmployeeDash() {


    const [value, setValue] = useState('Employees');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = useState([])

    useEffect(() => {
        if(tabs.length === 0){
            setValue("Employees");
        }

    },[tabs])

    const createEmployeeTab = employee => {
        if(tabs.filter(t => t.label === `${employee.firstName} ${employee.lastName}`).length === 0) {
            setTabs([...tabs, {
                label: `${employee.firstName} ${employee.lastName}`,
                panel: () => <EmployeeMain id={employee._id} team={employee.team} position={employee.employmentInfo.position}  />
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

    

    return (
        <MainContainer>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Paper sx={{p:0}}>
                        <TabList onChange={handleChange} variant="scrollable" >
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
        </MainContainer>
    );
}
