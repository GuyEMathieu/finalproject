import React, {useState, useContext, useEffect} from 'react'
import {Grid, Button} from '@mui/material';
import {styled} from '@mui/styles'
import MainContainer from '../../components/MainContainer';
import VehicleInfo from './VehicleInfo';
import Loading from '../../components/Loading';
import {useParams, useNavigate} from 'react-router-dom'
import { InventoryContext } from '../../context/inventoryContext/InventoryState';
import { DefaultContext } from '../../context/default_context/DefaultState';

const Profile = styled(Grid)(({theme}) => ({
    border: '1px solid #f00',
    // margin: theme.spacing(2)
}))

const VehicleProfile = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const inventoryContext = useContext(InventoryContext);
    const {inventoryVehicles, getVehicles} = inventoryContext;

    const defaultContext = useContext(DefaultContext)
    const {defaults, getAll} = defaultContext

    const [vehicle, setVehicle] = useState({})
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(defaults === null){
            getAll()
        }

        if(inventoryVehicles === null){
            getVehicles()
        } else {
            setVehicle(inventoryVehicles.find(v => v._id === id))
        }

        if(defaults && vehicle){
            setLoading(false)
        }
    },[inventoryVehicles, getVehicles, defaults, getAll, id, vehicle])

    const actions = [
        {
            title: "Showroom",
            variant: 'outlined',
            execute: () => navigate(-1)
        },
        {
            title: 'Purchase',
            execute: () => navigate(`/sales/purchase/${vehicle._id}`)
        }
    ]

    if(isLoading){
        return <Loading  />
    }
    return (
        <MainContainer title={'Vehicle Profile'}>
            <Profile container spacing={2} sx={{p: 1}}>
                <Grid item xs={12}>
                    <VehicleInfo vehicle={vehicle} defaults={defaults} actions={actions}/>
                </Grid>

                {/* <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <Button>Showroom</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button>Purchase</Button>
                    </Grid>
                </Grid> */}
            </Profile>
        </MainContainer>
    )
            
            
}

export default VehicleProfile
