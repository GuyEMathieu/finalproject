import {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, TextField, 
    MenuItem, Pagination
} from '@mui/material';

import { InventoryContext } from '../../context/inventoryContext/InventoryState';
import { DefaultContext } from '../../context/default_context/DefaultState';
import { getName } from '../../utils/Formatter';

import MainContainer from '../../components/MainContainer';
import VehicleCard from './VehicleCard'

export default function Showroom() {
    const inventoryContext = useContext(InventoryContext);
    const {getVehicles, inventoryVehicles} = inventoryContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [vehicles, setVehicles] = useState([])
    
    useEffect(() => {
        if(inventoryVehicles === null){
            getVehicles();
        }

        if(defaults === null){
            getAll()
        }
    }, [inventoryVehicles, getVehicles, getAll, defaults])

    const [filters, setFilters] = useState({makes: 'All', models: "All", years: 'All'})
    const {makes, models, years} = filters;

    useEffect(() => {
        if(inventoryVehicles){
            let arr = inventoryVehicles
            if(makes !== 'All'){
                arr = inventoryVehicles.filter(v => v.make === makes)
            } 

            if(models !== 'All'){
                arr = arr.filter(v =>v.model === models)
            }

            if(years !== 'All'){
                arr = arr.filter(v => v.year === years)
            }

            setVehicles(arr)
        }
    },[makes, inventoryVehicles, models, years])

    
    const handleManufacturerChange = e => {
        setFilters({
            makes: e.target.value,
            models: 'All',
            years: 'All'
        })
        //setPage(1)
    }
    const handleModelChange = e => {
        setFilters(prev => {
            return {
                ...prev,
                models: e.target.value,
                years: 'All'
            }
        })
        //setPage(1)
    }
    const Models = () => {
        let _models = ['All'];
        if(inventoryVehicles){
            for(let i = 0; i < inventoryVehicles.length; i++){
                if(inventoryVehicles[i].make === makes && !_models.includes(inventoryVehicles[i].model)){
                    _models.push(inventoryVehicles[i].model)
                }
            }
        }
        return _models;
    }

    const Years = () =>{
        let _years = ['All'];

        if(inventoryVehicles){
            for(let i = 0; i < inventoryVehicles.length; i++){
                if(!_years.includes(inventoryVehicles[i].year)){
                    _years.push(inventoryVehicles[i].year)
                }
            }
        }
        return _years;
    }
    //#region TODO: Pagination

    const [page, setPage] = useState(1);
        const handleChange = (event, value) => {
            setPage(value);
    };
    const [vehiclesPerPage, setVehiclesPerPage] = useState(8)

    const handleVehiclesPerPageChange = e => {
        setVehiclesPerPage(e.target.value);
        setPage(1)
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
                            {[4, 8, 16, 24, 36].map(ele => (
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
    //#endregion
    return (
        <MainContainer title='Showroom'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={makes} onChange={handleManufacturerChange}
                                    label='Manufacturers' name={'makes'} select>
                                    <MenuItem disabled>Select Manufacturer</MenuItem>
                                    {defaults && [{_id: 'All', name: 'All'}, ...defaults.manufacturers].map(make => (
                                        <MenuItem key={make._id} value={make._id}>{make.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    disabled={makes === 'All' ? true : false}
                                    value={models} onChange={handleModelChange}
                                    label='Models' name={'models'} select>
                                    <MenuItem disabled>Select Model</MenuItem>
                                    {Models().map(model => (
                                        <MenuItem key={model} value={model}>{getName(defaults.models,model)}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={years} onChange={e => setFilters({...filters, [e.target.name]: e.target.value})}
                                    label='Years' name={'years'} select>
                                    <MenuItem disabled>Select Year</MenuItem>
                                    {Years().map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* <Grid item xs={12}>
                    {Paginated()}
                </Grid> */}

                {defaults && vehicles &&
                    <Grid xs={12} item container spacing={2}>
                        {/* {vehicles && vehicles.slice(page * vehiclesPerPage, page * vehiclesPerPage + vehiclesPerPage).map(vehicle => ( */}
                        {vehicles.map(vehicle => (
                            <Grid item xs={12} md={4} lg={3} key={vehicle.vin}>
                                <VehicleCard vehicle={vehicle} defaults={defaults}/>
                            </Grid>
                        ))}
                    </Grid>
                }

                {/* <Grid item xs={12}>
                    {Paginated()}
                </Grid> */}
            </Grid>
        </MainContainer>
    );
}
