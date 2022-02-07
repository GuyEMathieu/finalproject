import {useState, useContext, useEffect} from 'react';
import {
    Grid,TextField, MenuItem, Button, Typography
} from '@mui/material';
import {DefaultContext} from '../context/default_context/DefaultState';
import Loading from './Loading';

export default function NewVehicle(props){
    const defaultContext = useContext(DefaultContext);
    const {getAll, defaults} = defaultContext;

    const {vehicle, handleVehicleChange, addNewVehicle} = props

    useEffect(() =>{
        if(defaults === null){
            getAll();
        }

    },[defaults, getAll])

    const Years = () => {
        let years = [];
        const startYear = parseInt(new Date().getFullYear())
        for(let i = startYear; i > (startYear - 10); i--){
            years.push(i)
        }
        return years;
    }

    if(defaults === null){
        return <Loading  />
    }

    const onSave = () => {
        if(vehicle && vehicle.vin 
            && vehicle.year && vehicle.make
            && vehicle.model && vehicle.miles){
            //alert("Saving")
            addNewVehicle(vehicle)
        } else {
            alert("Missing Fields")
        }
    }

    return (
        <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={12} >
                {/* <Typography >{`VIN: ${vehicle.vin}`}</Typography> */}
                <TextField 
                    onChange={handleVehicleChange}
                    label="VIN" disabled
                    value={vehicle.vin}/>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Year" name='year'
                    select value={vehicle.year}>
                    <MenuItem disabled>{'-- none --'}</MenuItem>
                    {Years().map(year =>(
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Manufacturer" name='make'
                    select value={vehicle.make}>
                    <MenuItem disabled>{'-- none --'}</MenuItem>
                    {defaults.manufacturers.map(make =>(
                        <MenuItem key={make._id} value={make._id}>{make.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Model" name='model' disabled={vehicle.make && vehicle.make.length > 0 ? false : true}
                    select value={vehicle.make}>
                    <MenuItem disabled>{'-- none --'}</MenuItem>
                    {vehicle.make && defaults.models
                        .filter(model => model.manufacturer === vehicle.make)
                        .map(model =>(
                            <MenuItem key={model._id} value={model._id}>{model.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Miles" name='miles'
                    value={vehicle.miles}/>
            </Grid>

            <Grid item >
                <Button variant='outlined' fullWidth={false} onClick={props.onClose}>Cancel</Button>
            </Grid>
            <Grid item >
                <Button fullWidth={false} onClick={onSave}>Save</Button>
            </Grid>
        </Grid>
    )
}