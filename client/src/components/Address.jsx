import {useState, useEffect} from 'react';
import {
    Grid, TextField, MenuItem, Skeleton
} from '@mui/material'
import Loading from './Loading';

export default function Address (props) {
    const {
        address, 
        defaults, 
        handleChange, 
        isDisabled
    } = props;

    const [isLoading, setLoading] = useState(true)
    const [currentAddress, setCurrentAddress] = useState({})
    useEffect(() =>{
        if(address){
            setCurrentAddress(address)
        }

        if(defaults) {
            setLoading(false)
        }
    },[address, defaults])

    const {
        street, aptNum, city, state, country, zipcode
    } = currentAddress;

    if(isLoading){
        return <Loading  />
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={10}>
                <TextField
                    label='Street Address' name='street'
                    value={street} disabled={isDisabled} 
                    onChange={handleChange}/>
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField
                    label='Apt#' name='aptNum'
                    value={aptNum} disabled={isDisabled} 
                    onChange={handleChange}/>
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField
                    label='City' name='city'
                    value={city} disabled={isDisabled} 
                    onChange={handleChange}/>
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField
                    label='State' name='state'
                    value={state || ''} disabled={isDisabled}
                    onChange={handleChange} select>
                    {defaults.states.map(state => (
                        <MenuItem key={state._id} value={state._id}>
                            {state.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField
                    label='Country' name='country'
                    value={country || ''} disabled={isDisabled}
                    onChange={handleChange} select>
                    {defaults.countries.map(country => (
                        <MenuItem key={country._id} value={country._id}>
                            {country.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
                <TextField
                    label='Zipcode' name='zipcode'
                    value={zipcode} disabled={isDisabled} 
                    onChange={handleChange}/>
            </Grid>

        </Grid>
    )
}