import * as React from 'react';
import {
    Card, styled, Grid
} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom'

import {getName, TruncateText} from '../../utils/Formatter';
import { Textfit } from 'react-textfit';

const CustomCard = styled(Card)(({theme}) => ({
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1)
}))

const Media = styled(CardMedia)(() => ({
    ":hover": {cursor: 'pointer'},
    width:'100%',
    height: '100%',
    objectFit: 'contain'
}))
export default function MediaCard({vehicle, defaults}) {
    const navigate = useNavigate();
    const title = () => {
        if(vehicle){
            const title = `${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`
            // if(title.split(' ').length > 3){
            //     const truncatedTitle = ``
            // }
            return title;
        }
        return ''
    }

    const goToProfile = () => {
        navigate(`/sales/vehicleprofile/${vehicle._id}`)
    }

    const goToPurchase = () => {
        navigate(`/sales/purchase/${vehicle._id}`)
    }
    return (
        <CustomCard >
            <Media
                component="img"
                image={vehicle.image}
                alt="vehicle"
                onClick={goToProfile}
            />
            <CardContent sx={{height: '150px'}}>
                {vehicle &&
                    <Textfit style={{textAlign: 'center'}}>
                        {title()}
                    </Textfit>
                }
                <Typography variant="h6" color="text.secondary" align='center'>
                    {vehicle.vin}
                </Typography>
                <Typography variant="body2" color="text.secondary" align='left' component='p'>
                    {TruncateText(vehicle.description)}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Button size="small" onClick={goToProfile} variant='outlined'>More Details</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button size="small" onClick={goToPurchase}>Purchase</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </CustomCard>
    );
}
