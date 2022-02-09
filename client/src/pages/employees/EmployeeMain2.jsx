import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import EmployeeProfile from './EmployeeProfile2'
import MainContainer from '../../components/MainContainer'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';
import {DefaultContext} from '../../context/default_context/DefaultState';

const EmployeeMain2 = () => {
    const {employeeId} = useParams();
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [employee, setEmployee] = useState(null)
    useEffect(() => {
        if(employeeList === null){
            getEmployees()
        }

        if(employeeList){
            setEmployee(employeeList.find(e => e._id === employeeId))
        }
        
        if(defaults === null){
            getAll()
        }
    },[employeeList, getEmployees, employeeId, defaults, getAll])

    const [value, setValue] = useState('Profile');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isDisabled, setIsDisabled] = useState(true);
    const [tempEmployee, setTempEmployee] = useState(null);
    const [changes, setChanges] = useState(null)

    const onEdit = () => {
        setChanges({_id: employee._id})
        setTempEmployee(employee)
        setIsDisabled(false)
    }

    const onSave = () => {
       // updateEmployee(changes)
        setIsDisabled(true)
        setTempEmployee(null)
        setChanges(null)
    }

    const cancelEdit = () => {
        setIsDisabled(true)
        setEmployee(tempEmployee)
        setChanges(null)
    }

    const handleEmployeeChange = e => {
        const {name, value} = e.target;
        if(name === 'firstName' || name === 'middleName' || name === 'lastName' 
            || name === 'ssn' || name === 'dateOfBirth' || name === 'gender' 
            || name === 'phone' || name === 'email'){
            setEmployee({...employee, [name]: value})
            setChanges({...changes, [name]: value})
        }
        else if(name === 'dlState' || name === 'dlNumber'){
            setEmployee({...employee, driverLicense: {...employee.driverLicense, [name]: value}})
            setChanges({...employee, driverLicense: {...employee.driverLicense, [name]: value}})
        } else if(name === 'street' || name === 'aptNum' || name === 'city' 
            || name === 'state' || name === 'country' || name === 'zipcode'){
            setEmployee({...employee, address: {...employee.address, [name]: value}})
            setChanges({...employee, address: {...employee.address, [name]: value}})
        } else if(name === 'startDate' || name === 'position' || name === 'salary'
            || name === 'department'){
            setEmployee({...employee, employmentInfo: {...employee.employmentInfo, [name]: value}})
            setChanges({...employee, employmentInfo: {...employee.employmentInfo, [name]: value}})
        }
    }
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
                        <EmployeeProfile 
                            onSave={onSave} cancelEdit={cancelEdit}
                            isDisabled={isDisabled} onEdit={onEdit}
                            handleEmployeeChange={handleEmployeeChange}
                            employee={employee} defaults={defaults}/>
                    </TabPanel>
                    <TabPanel value="Performance" sx={{px: 0, py: 0}}>Performance</TabPanel>
                </TabContext>
            </Box>
        </MainContainer>
    )
}

// employee, onSave, onEdit, cancelEdit,
//         defaults, handleEmployeeChange, isDisabled
export default EmployeeMain2