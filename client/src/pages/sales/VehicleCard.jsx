import * as React from 'react';
import {
    Card, styled, Grid
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {getName, TruncateText, FormatNumber} from '../../utils/Formatter';
import { Textfit } from 'react-textfit';
import Loading from '../../components/Loading';

const CustomCard = styled(Card)(({theme}) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1)
}))

const Media = styled(CardMedia)(({theme}) => ({
    objectFit: 'contain'
}))
export default function MediaCard({vehicle, defaults}) {

    const title = () => {
        if(vehicle){
            return `${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`
        }
        return ''
    }
    return (
        <CustomCard >
            <Media
                component="img"
                image={vehicle.image}
                alt="vehicle"
            />
            <CardContent>
                {vehicle &&
                    <Textfit>
                        {title()}
                    </Textfit>
                }
                <Typography variant="h6" color="text.secondary" align='center'>
                    {vehicle.vin}
                </Typography>
                <Typography variant="body2" color="text.secondary" align='start' component='p'>
                    {TruncateText(vehicle.description)}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button size="small" href='sales/vehicleprofile' variant='outlined'>More Details</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button size="small" href={`/sales/purchase/${vehicle._id}`}>Purchase</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </CustomCard>
    );
}
