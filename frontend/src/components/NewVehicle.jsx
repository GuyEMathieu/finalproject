import { useEffect} from 'react';
import {
    Grid,TextField, MenuItem, Button
} from '@mui/material';
import Loading from './Loading';

import { useSelector, useDispatch } from 'react-redux';
import {getDefaults} from '../redux/actions/defaultActions';

export default function NewVehicle(props){
    const dispatch = useDispatch()
    const {defaults} = useSelector(state => state.defaults);

    const {vehicle, handleVehicleChange, addNewVehicle} = props

    useEffect(() =>{
        if(defaults === null){
            dispatch(getDefaults());
        }

    },[defaults, dispatch])

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
            addNewVehicle(vehicle)
        } else {
            alert("Missing Fields")
        }
    }

    return (
        <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={12} >
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
                    select value={vehicle.model}>
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