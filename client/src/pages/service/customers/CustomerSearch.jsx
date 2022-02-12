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
    const {customerList, getCustomers} = customerContext;

    useEffect(() => {
        if(!customerList){
            getCustomers()
        }

    },[customerList, getCustomers])

    const [search, setSearch] = useState({})
    
    
    const onSearch = () => {
        alert("Search")
    }


    const handleCustomerSelection = customer => {
        props.createCustomerTab(customer)
    }

    const [openNewCustomerUI, setOpenNewCustomerUI] = useState(false)
    

    return (
        <Container container rowSpacing={1}>
            <Grid item xs={12} >
                <Paper sx={{margin:0}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label='First Name' name='firstName' 
                                placeholder='First Name'
                                onChange={e => setSearch({...search, firstName: e.target.value})}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label='Last Name' name='lastName' 
                                placeholder='Last Name'
                                onChange={e => setSearch({...search, lastName: e.target.value})}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                startIcon={<SearchIcon  />}
                                onClick={onSearch}>Search</Button>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button
                                startIcon={<AddCircleIcon  />}
                                onClick={() => setOpenNewCustomerUI(true)}>New</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <CustomerTable 
                    customers={customerList} 
                    handleSelection={handleCustomerSelection}
                />
            </Grid>

            <SidebarSlidePopup open={openNewCustomerUI}>
                {openNewCustomerUI ? <NewCustomerUI  setOpen={setOpenNewCustomerUI} handleCustomer={handleCustomerSelection}/> : null}
            </SidebarSlidePopup>
        </Container>
    )
}


