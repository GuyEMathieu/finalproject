import {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, TextField, 
    MenuItem, Stack, Pagination
} from '@mui/material';

import { InventoryContext } from '../../context/inventoryContext/InventoryState';
import { DefaultContext } from '../../context/default_context/DefaultState';


import MainContainer from '../../components/MainContainer';
import VehicleCard from './VehicleCard'
import Loading from '../../components/Loading';


export default function Showroom() {
    const inventoryContext = useContext(InventoryContext);
    const {getVehicles, inventoryVehicles} = inventoryContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [vehicles, setVehicles] = useState([])
    
    useEffect(() => {
        if(inventoryVehicles === null){
            getVehicles();
        } else {
            setVehicles(inventoryVehicles)
        }

        if(defaults === null){
            getAll()
        }
    }, [inventoryVehicles, getVehicles, getAll, defaults])

    const [filters, setFilters] = useState({})
    const {makes, models, years} = filters;
    const handleFilterChange = e => {
        alert(JSON.stringify(e.target))
    }

    const filterByManufacturer = e => {
        const {value} = e.target;

        setFilters({...filters, 
            makes : value, 
            models: 'All',
            years: 'All'
        })

        setVehicles(value === 'All' ? inventoryVehicles : inventoryVehicles.filter(v => v.make === value))
        setPage(1)
    }
    

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const [vehiclesPerPage, setVehiclesPerPage] = useState(8)

    const handleVehiclesPerPageChange = e => {
        setVehiclesPerPage(e.target.value);
        setPage(1)
    }

    const Models = () => {
        if(defaults){
            
            if(makes) {
                return makes === 'All' ? [{_id: 'All', name: 'All'},...defaults.models] : [{_id: 'All', name: 'All'}, ...defaults.models.filter(m => m.make === makes)]
            }
        }
        return []
    }
    const Years = () => {
        let arr = []
        if(inventoryVehicles){
            
            for(let i = 0; i < inventoryVehicles.length; i++){
                if(!arr.includes(inventoryVehicles[i].year)){
                    arr.push(inventoryVehicles[i].year)
                }
            }
        }
        return arr.sort()
    }

    const filterByModel = e => {
        const {value} = e.target
        setFilters({...filters, 
            models : e.target.value,
            years: 'All'
        })

        setVehicles(value === 'All' 
            ? inventoryVehicles.filter(v => v.make === value) 
            : inventoryVehicles.filter(v => v.model === value && v.make === filters.makes))
        
        setPage(1)
    }

    const filterByYear = e =>{
        if(makes === 'All'){
            setVehicles(inventoryVehicles.filter(v => v.year === e.target.value))
        } else if (makes !== 'All') {
            setVehicles(inventoryVehicles.filter(v => v.year === e.target.value && e.make === makes))
        }
        if(models === 'All'){
            setVehicles(inventoryVehicles.filter(v => v.year === e.target.value))
        } else if (makes !== 'All') {
            setVehicles(inventoryVehicles.filter(v => v.year === e.target.value && e.model === makes))
        }

        setPage(1);
        
    }

    

    const Paginated = () => {
        return (
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label='Vehicles Per Page' onChange={handleVehiclesPerPageChange}
                            value={vehiclesPerPage} select
                        >
                            {[4, 8, 16, 24].map(ele => (
                                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Pagination count={Math.floor(vehicles.length  / vehiclesPerPage)} page={page} onChange={handleChange} />
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    return (
        <MainContainer title='Showroom'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={makes} onChange={filterByManufacturer}
                                    label='Manufacturers' name={'makes'} select>
                                    <MenuItem disabled>Select Manufacturer</MenuItem>
                                    {defaults && [{_id: 'All', name: 'All'}, ...defaults.manufacturers].map(make => (
                                        <MenuItem ley={make._id} value={make._id}>{make.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    disabled={makes === 'All' ? true : false}
                                    value={models} onChange={filterByModel}
                                    label='Models' name={'models'} select>
                                    <MenuItem disabled>Select Model</MenuItem>
                                    {Models().map(model => (
                                        <MenuItem ley={model._id} value={model._id}>{model.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={years} onChange={filterByYear}
                                    label='Years' name={'years'} select>
                                    <MenuItem disabled>Select Year</MenuItem>
                                    <MenuItem ley={'All'} value={'All'}>{'All'}</MenuItem>
                                    {Years().map(year => (
                                        <MenuItem ley={year} value={year}>{year}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    {Paginated()}
                </Grid>
                
                {defaults && vehicles &&
                    <Grid xs={12} item container spacing={2}>
                        {vehicles.slice(page * vehiclesPerPage, page * vehiclesPerPage + vehiclesPerPage).map(vehicle => (
                            <Grid item xs={12} md={4} lg={3}>
                                <VehicleCard vehicle={vehicle} defaults={defaults}/>
                            </Grid>
                        ))} 
                    </Grid>
                }
                
                <Grid item xs={12}>
                    {Paginated()}
                </Grid>
            </Grid>
        </MainContainer>

    );
}
