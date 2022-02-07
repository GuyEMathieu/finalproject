import {useState, useEffect, useContext} from 'react';
import {
    Paper, Grid, TextField, 
    MenuItem, 
} from '@mui/material';

import { InventoryContext } from '../../context/inventoryContext/InventoryState';
import { DefaultContext } from '../../context/default_context/DefaultState';

import MainContainer from '../../components/MainContainer';
import VehicleCard from './VehicleCard'
import Loading from '../../components/Loading';
import VehicleCardSkeleton from '../../components/skeletons/VehicleCardSkeleton';

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

    const [Years, setYears] = useState([])
    const [filters, setFilters] = useState({make: 'All', model: "All", year: 'All'})
    const {make, model, year} = filters;

    useEffect(() => {
        if(inventoryVehicles){
            let arr = inventoryVehicles
            if(make !== 'All'){
                arr = inventoryVehicles.filter(v => v.make === make)
            } 

            if(model !== 'All'){
                arr = inventoryVehicles.filter(v => v.model === model)
            }

            if(year !== 'All'){
                arr = arr.filter(v => v.year === year)
            }

            let _years = [];
            for(let i = 0; i< inventoryVehicles.length; i++){
                if(!_years.includes(inventoryVehicles[i].year)){
                    _years.push(inventoryVehicles[i].year)
                }
            }
            _years.sort(function(a, b) {return b - a})

            setYears(_years)

            setVehicles(arr)
        }
    },[make, inventoryVehicles, model, year])
    
    const handleManufacturerChange = e => {
        setFilters({
            make: e.target.value,
            model: 'All',
            year: 'All'
        })
    }

    const handleModelChange = e => {
        setFilters(prev => {
            return {
                ...prev,
                model: e.target.value,
                year: 'All'
            }
        })
    }

    const handleYearChange = e => {
        const {name, value} = e.target
        setFilters(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const FilteredModels = () => {
        let _filteredModels = [];
        if(defaults){
            _filteredModels = defaults.models.filter(i => i.manufacturer === make)
        }
        return _filteredModels;
    }

    const displaySkeletons = () => {
        let vs = [];
        for(let i = 0; i < 8; i++){
            vs.push(<VehicleCardSkeleton  />)
        }
        return vs;
    }

    return (
        <MainContainer title='Showroom'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={make} onChange={handleManufacturerChange}
                                    label='Manufacturers' name={'make'} select>
                                    <MenuItem disabled>Select Manufacturer</MenuItem>
                                    {defaults && 
                                        [
                                            {name: 'All', _id: 'All'},
                                            ...defaults.manufacturers
                                        ]
                                        .map(make => (
                                        <MenuItem key={make._id} value={make._id}>{make.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    disabled={make === 'All' ? true : false}
                                    value={model} onChange={handleModelChange}
                                    label='filteredModels' name={'filteredModels'} select>
                                    <MenuItem disabled>Select Model</MenuItem>
                                    {defaults && 
                                        [
                                            {name: 'All', _id:'All'},
                                            ...FilteredModels()
                                        ]
                                        .map(model => (
                                        <MenuItem key={model._id} value={model._id}>{model.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    value={year} onChange={handleYearChange}
                                    label='Years' name='year' select>
                                    <MenuItem disabled>Select Year</MenuItem>
                                    {inventoryVehicles && defaults && 
                                        [ "All", ...Years]
                                        .map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid xs={12} item container spacing={2}>
                    {defaults && vehicles 
                    
                    ?   vehicles.map(vehicle => (
                            <Grid item xs={12} md={4} lg={3} key={vehicle.vin}>
                                <VehicleCard vehicle={vehicle} defaults={defaults}/>
                            </Grid>
                        ))
                    :   displaySkeletons.map((skeles, i) => (
                            <Grid item xs={12} md={4} lg={3} key={i}>
                                <skeles  />
                            </Grid>
                    ))
                    }
                </Grid>

            </Grid>
        </MainContainer>
    );
}
