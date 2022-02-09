import React, {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, styled,
    TextField, Button
} from '@mui/material'
import MainContainer from '../../components/MainContainer';
import {EmployeeContext} from '../../context/employee_context/EmployeeState';
import { useNavigate } from 'react-router-dom';

//#region ICONS
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//#endregion

//#region COMPONENTS
import EmployeeTable from './EmployeeTable'
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

export default function EmployeeSearch (props) {
    const navigate = useNavigate();
    const employeeContext = useContext(EmployeeContext)
    const {employeeList, getEmployees} = employeeContext;

    useEffect(() => {
        if(!employeeList){
            getEmployees()
        }

    },[employeeList, getEmployees])

    const [search, setSearch] = useState({})
    
    const onSearch = () => {
        alert("Search")
    }

    const onNewEmployee = () => {
        alert("Adding New Employee")
    }

    const handleEmployeeSelection = employee => {
        //props.createEmployeeTab(employee)
        navigate(`/hr/employees/profile/${employee._id}`)
    }

    return (
        <MainContainer>
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
                                    onClick={onNewEmployee}>New</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <EmployeeTable 
                        employees={employeeList} 
                        handleSelection={handleEmployeeSelection}
                    />
                </Grid>
            </Container>
        </MainContainer>

    )
}

