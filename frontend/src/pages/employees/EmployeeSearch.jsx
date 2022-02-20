import React, {useState, useEffect} from 'react';
import {
    Paper, Grid, styled,
    TextField, Button
} from '@mui/material'
import MainContainer from '../../components/MainContainer';

import EmployeeTable from './EmployeeTable';

//#region ICONS
import SearchIcon from '@mui/icons-material/Search';
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
    const handleEmployeeSelection = employee => {
        navigate(`/hr/employees/profile/${employee._id}`)
    }

    return (
        <MainContainer title="Employees">
            <Container container rowSpacing={1}>
                <Grid item xs={12} >
                    <Paper sx={{margin:0}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    label='First Name' name='firstName' 
                                    placeholder='First Name' value={search.firstName}
                                    onChange={handleSearch}/>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    label='Last Name' name='lastName' 
                                    placeholder='Last Name' value={search.lastName}
                                    onChange={handleSearch}/>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button
                                    startIcon={<SearchIcon  />}
                                    onClick={onSearch}>Search</Button>
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
        </MainContainer>

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
