import React, {useState, useEffect} from 'react'
import {Grid, Button} from '@mui/material';
import {styled} from '@mui/styles'
import MainContainer from '../../components/MainContainer';
import VehicleInfo from './VehicleInfo';
import Loading from '../../components/Loading';
import {useParams, useNavigate} from 'react-router-dom'

import { useDefault, useInventoryVehicles } from '../../hooks/customHooks';

const Profile = styled('div')(({theme}) => ({
    border: '1px solid #f00',
    borderRadius: 10,
    margin: theme.spacing(0),
    padding: theme.spacing(1),

}))

const VehicleProfile = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {inventoryVehicles, getVehicles} = useInventoryVehicles();

    const {defaults, getAll} = useDefault()

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
            <Profile >
                <VehicleInfo
                    vehicle={vehicle} defaults={defaults} actions={actions}
                />
            </Profile>
        </MainContainer>
    )
}

export default VehicleProfile
