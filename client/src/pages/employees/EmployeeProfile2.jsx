import {useContext, useEffect, useState} from 'react';
import {
    Grid, styled, Paper,
    Button, ButtonGroup, Box
} from '@mui/material';

import PeopleGlance from '../../components/peopleComponents/PeopleGlance';
import PersonalInfo from '../../components/peopleComponents/PersonalInfo';
import EmploymentInfo from './EmploymentInfo'
import Address from '../../components/Address';
import Loading from '../../components/Loading';
import DriverLicense from '../../components/DriverLicense';
import AccordionShell from '../../components/AccordionShell';

const CustomGrid = styled(Grid)(({theme}) => ({
    paddingTop: theme.spacing(1)
}))


function EmployeeProfile2(props) {
    const {
        employee, onSave, onEdit, cancelEdit,
        defaults, handleEmployeeChange, isDisabled
    } = props;

    const [expanded, setExpanded] = useState('Employment Information');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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