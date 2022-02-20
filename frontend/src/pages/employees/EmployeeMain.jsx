import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Paper, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import EmployeeProfile from './EmployeeProfile'
import MainContainer from '../../components/MainContainer'
import SalesEmployeePerformance from './SalesEmployeePerformance'
import SalesManagerPerformance from './SalesManagerPerformance'
import RepairEmployeePerformance from './RepairEmployeePerformance'
import RepairManagerPerformance from './RepairManagerPerformance'

import { useDispatch, useSelector } from 'react-redux';

import { getDefaults } from '../../redux/actions/defaultActions';
import { getEmployees } from '../../redux/actions/employeeActions';

export default function EmployeeMain () {
    const {employeeId} = useParams();
    const dispatch = useDispatch()
    const {defaults} = useSelector(state => state.defaults)
    const {employeeList} = useSelector(state => state.employees)


    const [position, setPosition] = useState('')

    useEffect(() => {
        if(!defaults){
            getDefaults();
        }

        if(employeeList === null){
            dispatch(getEmployees(employeeId))
        }

        if(defaults && employeeList && employeeId) {
            
            const position = defaults.positions.find(p => p._id === employeeList.find(emp => emp._id === employeeId).employmentInfo.position);
            if(position){
                setPosition(position.name)
            }
            
        }
    }, [defaults, employeeId, dispatch, employeeList])

    const [value, setValue] = useState('Profile');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const displayPerformanceType = () => {
        switch(position){
            case 'Sales Representative':
                return <SalesEmployeePerformance  />
            case 'Sales Manager':
                return <SalesManagerPerformance  />
            case 'Repair Technician':
                return <RepairEmployeePerformance  />
            case 'Repair Manager':
                return <RepairManagerPerformance  />
            default:
                return null;
        }
    }

    return (
        <MainContainer>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Paper sx={{ py: 0}}>
                        <TabList onChange={handleChange} >
                            <Tab label="Profile" value="Profile" />
                            <Tab label="Performance" value="Performance" />
                        </TabList>
                    </Paper>

                    <TabPanel value="Profile" sx={{px: 0, py: 0}}>
                        <EmployeeProfile />
                    </TabPanel>

                    <TabPanel value="Performance" sx={{px: 0, py: 0, pt: 1}}>
                        {displayPerformanceType()}
                    </TabPanel>
                </TabContext>
            </Box>
        </MainContainer>
    )
}
