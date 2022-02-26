import React, {useState, useEffect} from 'react';
import {
    Grid, Divider,
    TextField, Button, 
} from '@mui/material'
import { DatePicker } from '@mui/lab';

import {addCustomer} from '../../../redux/actions/customerActions'
import {useSelector, useDispatch} from 'react-redux';

export default function NewCustomerUI (props) {
    const dispatch = useDispatch()
    const {
        handleCustomer = () => {},
        setOpen
    } = props;

    const {currentCustomer} = useSelector(state => state.customers)

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
        
        dispatch(addCustomer(customer))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider>New Customer</Divider>
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

            <Grid item xs={12}>
                <Divider sx={{mt: 2}}/>
            </Grid>
        </Grid>
    )
}

