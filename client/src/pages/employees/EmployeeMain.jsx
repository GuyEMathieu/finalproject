import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import EmployeeProfile from './EmployeeProfile'
import MainContainer from '../../components/MainContainer'
import EmployeePerfomance from './EmployeePerformance'
import ManagerPerformance from './ManagerPerformance'

import { EmployeeContext } from '../../context/employee_context/EmployeeState';
import {DefaultContext} from '../../context/default_context/DefaultState';

const EmployeeMain = () => {
    const {employeeId} = useParams();
    const employeeContext = useContext(EmployeeContext);
    const {getProfile, currentEmployee} = employeeContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [isManager, setManager] = useState(false)

    useEffect(() => {
        if(!defaults){
            getAll();
        }

        if(currentEmployee === null){
            getProfile(employeeId)
        }

        if(defaults && currentEmployee && currentEmployee._id === employeeId) {
            const position = defaults.positions.find(p => p._id === currentEmployee.employmentInfo.position);
            if(position.name.split(" ")[1] === "Manager"){
                setManager(true)
            }
        }
    }, [defaults, getAll, getProfile, currentEmployee, employeeId])

    const [value, setValue] = useState('Profile');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainContainer>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Profile" value="Profile" />
                            <Tab label="Performance" value="Performance" />
                        </TabList>
                    </Box>
                    <TabPanel value="Profile" sx={{px: 0, py: 0}}>
                        <EmployeeProfile />
                    </TabPanel>
                    <TabPanel value="Performance" sx={{px: 0, py: 0, pt: 1}}>
                        {isManager ? <ManagerPerformance /> : <EmployeePerfomance  />}
                    </TabPanel>
                </TabContext>
            </Box>
        </MainContainer>
    )
}

export default EmployeeMain