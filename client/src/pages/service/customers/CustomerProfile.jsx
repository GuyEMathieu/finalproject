import React, {useState, useEffect, useContext} from 'react';
import {
    Grid, TextField, Paper
} from '@mui/material'

//#region Context
import {CustomerContext} from '../../../context/customer_context/CustomerState'
import {DefaultContext} from '../../../context/default_context/DefaultState'
//#endRegion

//#region Components
import PeopleGlance from '../../../components/peopleComponents/PeopleGlance';
import Loading from '../../../components/Loading';
import AccordionShell from '../../../components/AccordionShell';
//#endRegion

const CustomerProfile = (props) => {
    const {id} = props;
    const customerContext = useContext(CustomerContext);
    const {customerList, getCustomerById, getCustomers, currentCustomer} = customerContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [isLoading, setLoading] = useState(true);
    const [profile, setProfile] = useState({address: {}})

    useEffect(() => {
        if(customerList === null){
            getCustomers()
        }

        if(defaults === null){
            getAll()
        }

        if(customerList && defaults){
            setLoading(false)
        }
    },[customerList, getCustomers, defaults, getAll])

    useEffect(() => {
        if(currentCustomer === null || currentCustomer._id !== id){
            getCustomerById(id)
        }

        if(currentCustomer && currentCustomer._id === id){
            setProfile(currentCustomer)
        }
    },[id, currentCustomer, getCustomerById] )

    return (
            <Grid container spacing={1}>
                <Grid item xs={4} sx={{display: {sx: 'none', lg: 'block'}}}>
                    {isLoading ? <Loading /> : <PeopleGlance profile={profile} defaults={defaults} />}
                </Grid>

                <Grid xs={12} lg={8} item>
                    <AccordionShell title='Personal Info' handleChange={()=> {}}>

                    </AccordionShell>
                </Grid>
                
            </Grid>
    )
}

export default CustomerProfile
