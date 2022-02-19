import React, {useState, useEffect} from 'react'
import {styled} from '@mui/styles'
import MainContainer from '../../components/MainContainer';
import VehicleInfo from './VehicleInfo';
import Loading from '../../components/Loading';
import {useParams, useNavigate} from 'react-router-dom'

import { getVehicleById, getInventory} from '../../redux/actions/inventoryActions';

import { getDefaults } from '../../redux/actions/defaultActions';
import { useDispatch, useSelector } from 'react-redux';

export default function VehicleProfile () {
    const navigate = useNavigate()
    const {id} = useParams()

    const dispatch = useDispatch()

    const {inventoryVehicles} = useSelector(state => state.inventory);
    const {defaults} = useSelector(state => state.defaults)


    const [vehicle, setVehicle] = useState(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(inventoryVehicles === null){
            dispatch(getInventory())
        }
        if(defaults === null){
            dispatch(getDefaults())
        }

        if(inventoryVehicles === null){
            dispatch(getInventory())
        } 

        if(defaults && inventoryVehicles){
            setVehicle(inventoryVehicles.find(v => v._id === id))
            setLoading(false)
        }
    },[dispatch, defaults, id, inventoryVehicles, vehicle])

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

const Profile = styled('div')(({theme}) => ({
    border: '1px solid #f00',
    borderRadius: 10,
    margin: theme.spacing(0),
    padding: theme.spacing(1),

}))
