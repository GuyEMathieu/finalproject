import {useContext, useEffect, useState} from 'react';
import {
    Grid, styled, Paper,
    Button, ButtonGroup, Box
} from '@mui/material';
import AccordionShell from '../../components/AccordionShell';

import { EmployeeContext } from '../../context/employee_context/EmployeeState';
import {DefaultContext} from '../../context/default_context/DefaultState';

//#region COMPONENTS
import PersonGlance from '../../components/peopleComponents/PeopleGlance';
import PersonalInfo from '../../components/PersonalInfo';
import EmploymentInfo from './EmploymentInfo'
import Address from '../../components/Address';
import Loading from '../../components/Loading';
import DriverLicense from '../../components/DriverLicense';
//#endregion

const CustomGrid = styled(Grid)(({theme}) => ({
    paddingTop: theme.spacing(1)
}))

export default function EmployeeProfile(props) {
    const employeeContext = useContext(EmployeeContext)
    const {employeeList} = employeeContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const {id} = props

    const [employee, setEmployee] = useState(null);

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if(defaults === null){
            getAll()
        }
        if(employee === null){
            setEmployee(employeeList.find(e => e._id === id))
        }

        if(employee !== null && defaults !== null){
            setLoading(false)
        }
    }, [id, employee, employeeList, defaults, getAll])

    const [expanded, setExpanded] = useState('Personal Information');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [isDisabled, setIsDisabled] = useState(true);

    const onEdit = () => {
        setIsDisabled(!isDisabled)
    }

    const onSave = () => {
        setIsDisabled(!isDisabled)
    }
    
    return (
        <CustomGrid container spacing={1} sx>
            <Grid item xs={4} sx={{display: {xs: 'none', lg: 'block'}}}>
                {isLoading ? <Paper><Loading  /></Paper> : <PersonGlance profile={employee} defaults={defaults}/> }
            </Grid>

            <Grid item xs={12} lg={8} container spacing={1}>
                <Grid item xs={12} >
                    <Paper sx={{p: 1}}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <ButtonGroup variant="outlined" size='small'>
                                {isDisabled ? <Button onClick={onEdit}>Edit</Button> : null }
                                {!isDisabled ? <Button onClick={onSave}>Save</Button> : null}
                            </ButtonGroup>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Personal Information'}>
                        {isLoading ? <Loading  /> : <PersonalInfo data={employee || {}} defaults={defaults} isDisabled={isDisabled}/> }
                    </AccordionShell>
                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Driver License'}>
                        
                        {isLoading 
                            ? <Loading  /> 
                            : <DriverLicense 
                                isDisabled={isDisabled}
                                data={employee.driverLicense || {}} 
                                defaults={defaults} /> }
                    </AccordionShell>
                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Address Information'}>
                        {isLoading ? <Loading  /> : <Address address={employee.address} defaults={defaults} isDisabled={isDisabled}/> }
                    </AccordionShell>
                    <AccordionShell 
                        handleChange={handleChange}
                        expanded={expanded} 
                        title={'Employment Information'}>
                        {isLoading ? <Loading  /> : <EmploymentInfo employmentInfo={employee.employmentInfo} defaults={defaults} isDisabled={isDisabled}/> }
                    </AccordionShell>
                </Grid>
            </Grid>
        </CustomGrid>
    )
}

