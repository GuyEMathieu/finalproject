import React, {useState} from 'react';
import { Box, Tab, Paper } from '@mui/material';
import {TabContext, TabList, TabPanel } from '@mui/lab';

import EmployeeProfile from './EmployeeProfile';
import EmployeePerformance from './EmployeePerformance';

function EmployeeMain(props) {
    const {id} = props;

    const [value, setValue] = useState('Performance');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1 }}>
                <Paper sx={{p:0}}>
                    <TabList onChange={handleChange} variant="scrollable" >
                        <Tab label='Profile' value='Profile'/>
                        <Tab label='Performance' value='Performance'/>
                    </TabList>
                </Paper>
            </Box>
            <TabPanel value="Profile" sx={{px: 0, py: 0, my: 0}}>
                <EmployeeProfile id={id} /> 
            </TabPanel>
            <TabPanel value="Performance" sx={{px: 0, py: 1, my: 0}}>
                <EmployeePerformance employeeId={id}/>
            </TabPanel>
        </TabContext>
    )
}

export default EmployeeMain
