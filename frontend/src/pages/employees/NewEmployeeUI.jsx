import React, {useState, useEffect} from 'react';
import {
    Grid, Divider,
    TextField, Button, 
} from '@mui/material'
import { DatePicker } from '@mui/lab';

import {addEmployee} from '../../redux/actions/employeeActions'
import {useSelector, useDispatch} from 'react-redux';

export default function NewCustomerUI (props) {
    const dispatch = useDispatch()
    const {
        setEmployee = () => {},
        setOpen, employee, handleEmployee
    } = props;

    const {currentEmployee} = useSelector(state => state.employees)

    const {firstName, lastName, dateOfBirth} = employee;

    useEffect(() => {
        if(currentEmployee 
            && currentEmployee.firstName === employee.firstName
            && currentEmployee.lastName === employee.lastName
        ){
            handleEmployee(currentEmployee)
        }
    }, [currentEmployee, employee, handleEmployee])

    const saveEmployee = () => {
        if(!employee.firstName || !employee.lastName || !employee.dateOfBirth){
            return
        }
        employee.firstName.trim();
        employee.lastName.trim();
        
        dispatch(addEmployee(employee))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider>New Employee</Divider>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label='First Name' name='firstName'
                    value={firstName} onChange={e => setEmployee({...employee, [e.target.name]: e.target.value})} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label='last Name' name='lastName'
                    value={lastName} onChange={e => setEmployee({...employee, [e.target.name]: e.target.value})} />
            </Grid>

            <Grid item xs={12}>
                <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={(newValue) => {
                        setEmployee({...employee, dateOfBirth: newValue});
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
            </Grid>

            <Grid item xs={12} md={6}>
                <Button variant='contained' onClick={saveEmployee}>Save</Button>
            </Grid>

            <Grid item xs={12}>
                <Divider sx={{mt: 2}}/>
            </Grid>
        </Grid>
    )
}

