import React, {useState, useEffect} from 'react';
import {
    Paper, Grid, styled,
    TextField, Button
} from '@mui/material'
import MainContainer from '../../components/MainContainer';
import SidebarSlidePopup from '../../components/SidebarSlidePopup';

import EmployeeTable from './EmployeeTable';
import NewCustomerUI from './NewEmployeeUI';

//#region ICONS
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//#endregion

//#region COMPONENTS
//#endregion


import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getEmployees, filterEmployees, resetEmployees} from '../../redux/actions/employeeActions'
import { getDefaults } from '../../redux/actions/defaultActions';

export default function EmployeeSearch (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openNewEmployeePopUp, setOpenNewEmployeePop] = useState(false)

    const [newEmployee, setNewEmployee] = useState(null)
    const {employeeList, filteredEmployees } = useSelector((state) => state.employees)
    const {defaults } = useSelector((state) => state.defaults)
    useEffect(()=>{
        if(employeeList === null){
            dispatch(getEmployees())
        }

        if(defaults === null){
            dispatch(getDefaults())
        }
    }, [dispatch, employeeList, defaults])

    const [search, setSearch] = useState({firstName: '', lastName: ''})
    
    const onSearch = () => {
        if(!search.firstName && !search.lastName){
            alert("Missing Search Fields")
            return
        }
        dispatch(filterEmployees(search))
    }

    const handleSearch = e => {
        const {name, value} = e.target;
        setSearch({...search, [name]: value})
        if(
            (name === 'firstName' && value === '' && search.lastName === '') ||
            (name === 'lastName' && value === '' && search.firstName === ''))
        {
            dispatch(resetEmployees())
        }
    }

    const onNewEmployee = () => {
        setNewEmployee(demoEmployee)
        setOpenNewEmployeePop(true)
    }

    const handleEmployeeSelection = employee => {
        navigate(`/hr/employees/profile/${employee._id}`)
    }

    return (
        <MainContainer title="Employees">
            <Container container rowSpacing={1}>
                <Grid item xs={12} >
                    <Paper sx={{margin:0}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label='First Name' name='firstName' 
                                    placeholder='First Name' value={search.firstName}
                                    onChange={handleSearch}/>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    label='Last Name' name='lastName' 
                                    placeholder='Last Name' value={search.lastName}
                                    onChange={handleSearch}/>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    startIcon={<SearchIcon  />}
                                    onClick={onSearch}>Search</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button
                                    startIcon={<AddCircleIcon  />}
                                    onClick={onNewEmployee}>New</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <EmployeeTable 
                        employees={filteredEmployees ? filteredEmployees : employeeList} 
                        handleSelection={handleEmployeeSelection}
                    />
                </Grid>
            </Container>

            <SidebarSlidePopup open={openNewEmployeePopUp}>
                {openNewEmployeePopUp 
                    ? <NewCustomerUI 
                            handleEmployee={handleEmployeeSelection}
                            employee={newEmployee}
                            setOpen={setOpenNewEmployeePop} 
                            setEmployee={setNewEmployee}
                        />
                    : null
                }
            </SidebarSlidePopup>
        </MainContainer>

    )
}

const demoEmployee = {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date('01/15/1975')
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
