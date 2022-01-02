import {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, TextField, MenuItem
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
        const {name, value} = e.target
        alert(JSON.stringify(e.target))
    }

    const Models = () => {
        if(defaults){
            
            if(makes) {
                return makes === 'All' ? defaults.models : defaults.models.filter(m => m.make === makes)
            }
        }
        return []
    }

    return (
        <MainContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={makes} onChange={e => setFilters({...filters, makes : e.target.value})}
                                    label='Manufacturers' name={'makes'} select>
                                    <MenuItem disabled>Select Manufacturer</MenuItem>
                                    <MenuItem ley={'All'} value={'All'}>{'All'}</MenuItem>
                                    {defaults && defaults.manufacturers.map(make => (
                                        <MenuItem ley={make._id} value={make._id}>{make.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={models} onChange={handleFilterChange}
                                    label='Models' name={'models'} select>
                                    <MenuItem disabled>Select Model</MenuItem>
                                    <MenuItem ley={'All'} value={'All'}>{'All'}</MenuItem>
                                    {Models().map(model => (
                                        <MenuItem ley={model._id} value={model._id}>{model.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={years} onChange={handleFilterChange}
                                    label='Years' name={'years'} select>
                                    <MenuItem disabled>Select Year</MenuItem>
                                    <MenuItem ley={'All'} value={'All'}>{'All'}</MenuItem>
                                    {/* {Models().map(model => (
                                        <MenuItem ley={model._id} value={model._id}>{model.name}</MenuItem>
                                    ))} */}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                
                {defaults && vehicles &&
                    <Grid xs={12} item container spacing={2}>
                        {vehicles.map(vehicle => (
                            <Grid item xs={12} md={4} lg={3}>
                                <VehicleCard vehicle={vehicle} defaults={defaults}/>
                            </Grid>
                        ))} 
                    </Grid>
                }
            </Grid>
        </MainContainer>

    );
}
