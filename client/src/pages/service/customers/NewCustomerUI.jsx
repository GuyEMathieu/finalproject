import React, {useState, useEffect} from 'react';
import {
    Grid, Typography,
    TextField, Button, 
} from '@mui/material'
import { DatePicker } from '@mui/lab';

import {useCustomer} from '../../../hooks/customHooks';

export default function NewCustomerUI (props) {
    const {
        handleCustomer = () => {},
        setOpen
    } = props;

    const {addCustomer, currentCustomer} = useCustomer();

    const [customer, setCustomer] = useState({});
    const {firstName, lastName, dateOfBirth} = customer;

    useEffect(() => {
        if(currentCustomer 
            && currentCustomer.firstName === customer.firstName
            && currentCustomer.lastName === customer.lastName
        ){
            handleCustomer(currentCustomer)
        }
    }, [currentCustomer, customer, handleCustomer])

    const saveCustomer = () => {
        if(!customer.firstName || !customer.lastName || !customer.dateOfBirth){
            return
        }
        customer.firstName.trim();
        customer.lastName.trim();
        
        addCustomer(customer)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>New Customer</Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label='First Name' name='firstName'
                    value={firstName} onChange={e => setCustomer({...customer, [e.target.name]: e.target.value})} />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label='last Name' name='lastName'
                    value={lastName} onChange={e => setCustomer({...customer, [e.target.name]: e.target.value})} />
            </Grid>

            <Grid item xs={12}>
                <DatePicker
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={(newValue) => {
                        setCustomer({...customer, dateOfBirth: newValue});
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Button variant='outlined' onClick={() => setOpen(false)}>Cancel</Button>
            </Grid>

            <Grid item xs={12} md={6}>
                <Button variant='contained' onClick={saveCustomer}>Save</Button>
            </Grid>
        </Grid>
    )
}

