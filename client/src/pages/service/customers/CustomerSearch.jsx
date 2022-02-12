import React, {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, styled, 
    TextField, Button, 
} from '@mui/material'
import SidebarSlidePopup from '../../../components/SidebarSlidePopup'
import {CustomerContext} from '../../../context/customer_context/CustomerState';
import NewCustomerUI from './NewCustomerUI'
//#region ICONS
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import BackspaceIcon from '@mui/icons-material/Backspace';
//#endregion

//#region COMPONENTS
import CustomerTable from './CustomerTable'
//#endregion


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

export default function CustomerSearch (props) {
    const customerContext = useContext(CustomerContext)
    const {
        customerList, getCustomers, filterCustomers, 
        filteredCustomers, resetFilteredCustomers
    } = customerContext;

    useEffect(() => {
        if(!customerList){
            getCustomers()
        }

    },[customerList, getCustomers])

    const [search, setSearch] = useState({firstName: '', lastName: ''})
    const {firstName, lastName} = search;
    
    
    const onSearch = () => {
        filterCustomers(search)
    }

    const handleSearchChanged = e => {
        const {name, value} = e.target;
        setSearch({...search, [name]: value})
    }


    const handleCustomerSelection = customer => {
        resetFilteredCustomers()
        props.createCustomerTab(customer)
    }

    const handleClear = () => {
        setSearch({firstName: '', lastName: ''})
        resetFilteredCustomers();
    }
    const [openNewCustomerUI, setOpenNewCustomerUI] = useState(false)
    

    return (
        <Container container rowSpacing={1}>
            <Grid item xs={12} >
                <Paper sx={{margin:0}}>
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
                <CustomerTable 
                    customers={customerList} 
                    filteredCustomers={filteredCustomers}
                    handleSelection={handleCustomerSelection}
                    resetFilteredCustomers={resetFilteredCustomers}
                />
            </Grid>

            <SidebarSlidePopup open={openNewCustomerUI}>
                {openNewCustomerUI ? <NewCustomerUI  setOpen={setOpenNewCustomerUI} handleCustomer={handleCustomerSelection}/> : null}
            </SidebarSlidePopup>
        </Container>
    )
}


