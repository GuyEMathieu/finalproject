import {useEffect, useState} from 'react';
import {
    Grid, styled, Paper,
    Button, ButtonGroup, Box
} from '@mui/material';
import {useParams} from 'react-router-dom';


import PeopleGlance from '../../components/peopleComponents/PeopleGlance';
import PersonalInfo from '../../components/peopleComponents/PersonalInfo';
import EmploymentInfo from './EmploymentInfo'
import Address from '../../components/Address';
import Loading from '../../components/Loading';
import DriverLicense from '../../components/DriverLicense';
import AccordionShell from '../../components/AccordionShell';
import { useSelector, useDispatch } from 'react-redux';

import { getDefaults } from '../../redux/actions/defaultActions';
import { getEmployees } from '../../redux/actions/employeeActions';
import MainContainer from '../../components/MainContainer';
import Copyright from '../../components/Copyright';

const CustomGrid = styled(Grid)(({theme}) => ({
    paddingTop: theme.spacing(1)
}))


function EmployeeProfile2(props) {
    const {employeeId} = useParams();
    const dispatch = useDispatch()

    const [isDisabled, setDisabled] = useState(true)

    const {defaults} = useSelector(state => state.defaults);
    const {employeeList} = useSelector(state => state.employees)

    const [isLoading, setLoading] = useState(true)
    const [employee, setEmployee] = useState({
        driverLicense: {},
        employeeInfo: {},
        address: {}
    })
    useEffect(() => {
        if(defaults === null){
            dispatch(getDefaults())
        }

        if(employeeList === null){
            dispatch(getEmployees())
        }

        if(employeeList && defaults){
            setEmployee(employeeList.find(emp => emp._id === employeeId))
        }
    }, [defaults, dispatch, employeeList, employeeId])

    const [temp, setTemp] = useState(null)
    const [changes, setChanges] = useState(null)


    const onEdit = e =>{
        setDisabled(false)
        setTemp(employee)
        setChanges({_id: employee._id})
    }

    const cancelEdit = e =>{
        setDisabled(true);
        setChanges(null)
        setEmployee(temp);
    }

    const [expanded, setExpanded] = useState('Personal Information');
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEmployeeChange = e => {
        const {name, value} = e.target;

        if(
            name === 'firstName' || name === 'middleName' 
            || name === 'lastName' || name === 'gender'
            || name === 'ssn' || name === 'dateOfBirth' 
            || name === 'phone' || name === 'email'){
            setEmployee({...employee, [name]: value})
            setChanges({...changes, [name]: value})
        }

        if(name === 'dlState' || name === 'dlNumber'){
            setEmployee({...employee, driverLicense: {...employee.driverLicense, [name]: value}})
            setChanges({...changes, driverLicense: {...changes.driverLicense, [name]: value}})
        }
        
        if(
            name === 'street' || name === 'aptNum'
            || name === 'city' || name === 'state' 
            || name === 'country' || name === 'zipcode'){

            setEmployee({...employee, address: {...employee.address, [name]: value}})
            setChanges({...changes, address: {...changes.address, [name]: value}})
        }

        if(
            name === 'startDate' || name === 'salary'
            || name === 'department' || name === 'position'){

            setEmployee({...employee, employmentInfo: {...employee.employmentInfo, [name]: value}})
            setChanges({...changes, employmentInfo: {...changes.employmentInfo, [name]: value}})
        }
    }

    const onSave = e => {
        // updateEmployee(changes)
        // setChanges(null);
        // setTemp(null);
        // setDisabled(true)
    }

    return (
        <CustomGrid container spacing={2}>
            <Grid item xs={4} sx={{display: {xs: 'none', lg: 'block'}}}>
                <PeopleGlance profile={employee} defaults={defaults}/> 
            </Grid>
            <Grid item xs={12} lg={8} container spacing={1}>
                <Grid item xs={12} >
                    <Paper sx={{p: 1}}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <ButtonGroup variant="outlined" size='small'>
                                {isDisabled ? <Button onClick={onEdit}>Edit</Button> : <Button onClick={cancelEdit}>Cancel</Button> }
                                {!isDisabled ? <Button variant='contained' onClick={onSave}>Save</Button> : null}
                            </ButtonGroup>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Personal Information'}>
                        <PersonalInfo 
                            data={employee} 
                            defaults={defaults} 
                            isDisabled={isDisabled}
                            handleChange={handleEmployeeChange}
                        /> 
                    </AccordionShell>

                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Driver License'}>
                        <DriverLicense 
                            handleChange={handleEmployeeChange}
                            isDisabled={isDisabled}
                            driverLicense={employee ? employee.driverLicense : null} 
                            defaults={defaults ? defaults : null} 
                        />
                    </AccordionShell>

                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Address Information'}>
                        <Address address={employee ? employee.address : null} 
                            handleChange={handleEmployeeChange}
                            defaults={defaults ? defaults : null} isDisabled={isDisabled}/> 
                    </AccordionShell>

                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Employment Information'}>
                            <EmploymentInfo 
                                handleChange={handleEmployeeChange}
                                employmentInfo={employee ? employee.employmentInfo : null} 
                                defaults={defaults ? defaults : null} isDisabled={isDisabled}
                            />
                    </AccordionShell>
                    
                </Grid>
            </Grid>  
        </CustomGrid>
    )
}

export default EmployeeProfile2