import React, {useState, useEffect} from 'react';
import { Paper, Grid, styled, TextField, Button } from '@mui/material'

import SidebarSlidePopup from '../../../components/SidebarSlidePopup'


//#region ICONS
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BackspaceIcon from '@mui/icons-material/Backspace';
//#endregion

//#region COMPONENTS
import Alerts from '../../../components/Alerts'
import CustomerTable from './CustomerTable'
import NewCustomerUI from './NewCustomerUI'
//#endregion

import {getDefaults, resetDefaultError} from '../../../redux/actions/defaultActions';

import {getCustomers, resetCustomerError, 
    filterCustomers, resetCustomers, isCustomerSuccess
} from '../../../redux/actions/customerActions'

import { useDispatch, useSelector } from 'react-redux';



export default function CustomerSearch (props) {
    const dispatch = useDispatch()
    const {customerList, filteredCustomers, customerMessage, isCustomerError} = useSelector((state) => state.customers)
    const { defaults, isDefaultError, defaultMessage,  } = useSelector((state) => state.defaults)
    const [alerts, setAlerts] = useState(null)

    useEffect(() => {
        if(!customerList){
            dispatch(getCustomers())
        }
        if(defaults === null){
            dispatch(getDefaults())
        }

        if(isCustomerError || isDefaultError){
            setAlerts([customerMessage, defaultMessage])
            if(isCustomerError) dispatch(resetCustomerError())
            if(isDefaultError) dispatch(resetDefaultError())
        }

    },[defaults, dispatch, isDefaultError, isCustomerError, defaultMessage, customerList, customerMessage])

    const [search, setSearch] = useState({firstName: '', lastName: ''})
    const {firstName, lastName} = search;
    
    const onSearch = () => {
        dispatch(filterCustomers(search))
    }

    const handleSearchChanged = e => {
        const {name, value} = e.target;
        setSearch({...search, [name]: value})

        if((name === 'firstName' && value === '' && !search.lastName)  ||
            (name === 'lastName' && value === '' && !search.firstName)
        ){
            dispatch(resetCustomers())
        } 
    }

    const handleCustomerSelection = customer => {
        dispatch(resetCustomers())
        props.createCustomerTab(customer)
    }

    const handleClear = () => {
        setSearch({firstName: '', lastName: ''})
        dispatch(resetCustomers())
    }

    const [openNewCustomerUI, setOpenNewCustomerUI] = useState(false)
    
    return (
        <Container container rowSpacing={1}>
            
            <Grid item xs={12} >
                <Paper sx={{margin:0, p:1, }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label='First Name' name='firstName' 
                                placeholder='First Name' value={firstName}
                                onChange={handleSearchChanged}/>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                label='Last Name' name='lastName' 
                                placeholder='Last Name' value={lastName}
                                onChange={handleSearchChanged}/>
                        </Grid>

                        <Grid item container xs={12} md={4}>
                            <Grid container spacing={1}>
                                
                                <Grid item xs>
                                    <Button
                                        disabled={!firstName && !lastName}
                                        startIcon={<SearchIcon  />}
                                        onClick={onSearch}>Search</Button>
                                </Grid>
                                {(firstName || lastName) && 
                                    <Grid item xs>
                                        <Button
                                            variant='outlined'
                                            startIcon={<BackspaceIcon  />}
                                            onClick={handleClear}
                                            >
                                                Clear
                                            </Button>
                                    </Grid>
                                }
                                <Grid item xs>
                                    <Button
                                        startIcon={<AddCircleIcon  />}
                                        onClick={() => setOpenNewCustomerUI(true)}>Customer</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            

            <Grid item xs={12}>
                {alerts ? <Alerts alerts={alerts} /> : null }
            </Grid>

            <Grid item xs={12}>
                <CustomerTable 
                    customers={customerList} 
                    filteredCustomers={filteredCustomers}
                    handleSelection={handleCustomerSelection}
                    resetCustomers={resetCustomers}
                /> 
            </Grid>

            <SidebarSlidePopup open={openNewCustomerUI}>
                {openNewCustomerUI ? <NewCustomerUI  setOpen={setOpenNewCustomerUI} handleCustomer={handleCustomerSelection}/> : null}
            </SidebarSlidePopup>
        </Container>
    )
}

//#region CSS
const Container = styled(Grid)(({ theme }) => ({
    display: 'flex',
    width: 'inherit',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    margin: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
//#endregion


