import {useContext, useEffect, useState} from 'react';
import {
    Grid, styled
} from '@mui/material';
import AccordionShell from '../../components/AccordionShell';

import { EmployeeContext } from '../../context/employee_context/EmployeeState';
import {DefaultContext} from '../../context/default_context/DefaultState';

import EmployeeGlance from './EmployeeGlance';
import PersonalInfo from '../../components/PersonalInfo';

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

    useEffect(() => {
        if(defaults === null){
            getAll()
        }
        if(employee === null){
            setEmployee(employeeList.find(e => e._id === id))
        }
    }, [id, employee, employeeList, defaults, getAll])

    const [expanded, setExpanded] = useState('Personal Information');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };



    return (
        <CustomGrid container spacing={1} sx>
            <Grid item xs={4} sx={{display: {xs: 'none', lg: 'block'}}}>
                <EmployeeGlance employee={employee} defaults={defaults}/>
            </Grid>

            <Grid item xs={12} lg={8}>
                <AccordionShell 
                    handleChange={handleChange}
                    expanded={expanded} 
                    title={'Personal Information'}>
                        <PersonalInfo data={employee || {}} defaults={defaults} />
                </AccordionShell>
                <AccordionShell 
                    handleChange={handleChange}
                    expanded={expanded} 
                    title={'Address Information'}>
                </AccordionShell>
            </Grid>
        </CustomGrid>
    )
}

