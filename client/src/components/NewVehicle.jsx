import {useState, useContext, useEffect} from 'react';
import {
    Grid,TextField, MenuItem, Button, Typography
} from '@mui/material';
import {DefaultContext} from '../context/default_context/DefaultState';
import { generateVIN, prettyAlert } from '../utils/Formatter';
import Loading from './Loading';

export default function NewVehicle(props){
    const defaultContext = useContext(DefaultContext);
    const {getAll, defaults} = defaultContext;

    useEffect(() =>{
        if(defaults === null){
            getAll();
        }
    },[defaults, getAll])

    
    const [vehicle, setVehicle] = useState({vin: generateVIN().toUpperCase()})

    const handleVehicleChange = e =>{
        const {name, value} = e.target;
        setVehicle(prev =>{
            return {
                ...prev,
                [name]: value,
                serviceLogs: []
            }
        })
    }

    const Models = () =>{
        if(defaults && vehicle.make && vehicle.make.length > 0){
            return defaults.models.filter(model => model.make === vehicle.make)
        }
        return []
    }

    const Years = () => {
        let years = [];
        const startYear = parseInt(new Date().getFullYear())
        for(let i = startYear; i > (startYear - 10); i--){
            years.push(i)
        }

        return years;
    }

    const handleSave = () => {
        props.addNewVehicle(vehicle)
        props.onClose()

    }

    if(defaults === null){
        return <Loading  />
    }

    return (
        <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={12} >
                <Typography >{`VIN: ${vehicle.vin}`}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Model" name='model' disabled={vehicle.make && vehicle.make.length > 0 ? false : true}
                    select value={vehicle.make}>
                    <MenuItem disabled>{'-- none --'}</MenuItem>
                    {Models().map(model =>(
                        <MenuItem key={model._id} value={model._id}>{model.name}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField 
                    onChange={handleVehicleChange}
                    label="Miles" name='miles'
                    value={vehicle.miles}/>
            </Grid>

            <Grid item >
                <Button variant='outlined' fullWidth={false} onClick={props.onClose}>Cancel</Button>
            </Grid>
            <Grid item >
                <Button fullWidth={false} onClick={handleSave}>Save</Button>
            </Grid>
            
        </Grid>
    )
}