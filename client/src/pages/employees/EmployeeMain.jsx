import React, {useState, useEffect, useContext} from 'react';
import { Box, Tab, Paper } from '@mui/material';
import {TabContext, TabList, TabPanel } from '@mui/lab';

import {DefaultContext} from '../../context/default_context/DefaultState'

import EmployeeProfile from './EmployeeProfile';
import EmployeePerformance from './EmployeePerformance';
import ManagerPerformance from './ManagerPerformance';
import Loading from '../../components/Loading';
import { getName, prettyAlert } from '../../utils/Formatter';

function EmployeeMain(props) {
    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const {id, team, position} = props;

    useEffect(() => {
        if(defaults === null){
            getAll()
        }
    }, [defaults, getAll])

    const [value, setValue] = useState('Performance');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isManager = () => {
        if(defaults){
            return getName(defaults.positions, position).split(' ')[1] === 'Manager' ? true : false
        }

        return false
    }

    if(defaults === null){
        return <Loading  />
    }

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
                {isManager() 
                    ? <ManagerPerformance employeeId={id} teamNumber={team}/>
                    : <EmployeePerformance employeeId={id}/>
                }
            </TabPanel>
        </TabContext>
    )
}

export default EmployeeMain
