import React from 'react'
import {
    Grid, TextField, Button
} from '@mui/material';
import {styled} from '@mui/styles'
import { FormatNumber, getName } from '../../utils/Formatter'

const Image = styled('img')(({theme}) => ({
    objectFit: 'contain',
    width: '100%',
}))

const VehicleInfo = (props) => {
    const {
        vehicle,
        defaults,
        actions = null
    } = props;

    if(!vehicle && !defaults){
        return null
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Image src={vehicle.image} />
            </Grid>

            <Grid item xs={12} md={6} container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        disabled 
                        value={`${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`}
                        label='Year' 
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        disabled value={vehicle.vin}
                        label='VIN' 
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        disabled value={vehicle.description}
                        label='Description' multiline maxRows={2}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        disabled value={FormatNumber(vehicle.price)}
                        label='Price' 
                    />
                </Grid>

            
                {actions &&  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        {actions.map(action => (
                            <Grid item xs={12} md={6} key={action.title}>
                                <Button 
                                    onClick={() => action.execute()}
                                    variant={action.variant}>
                                    {action.title}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>}
            </Grid> 
        </Grid>
        
    )
}

export default VehicleInfo
