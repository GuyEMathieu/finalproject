import {useState, useEffect} from 'react';
import {
    Box,
    Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';

import { getName } from '../../../utils/Formatter';
import Loading from '../../../components/Loading';

import ClearIcon from '@mui/icons-material/Clear';

import CustomerProfile from './CustomerProfile'
import CustomerVehicleTable from './CustomerVehicleTable';
import VehicleDetails from './VehicleDetails';

import { getDefaults, resetDefaultError } from '../../../redux/actions/defaultActions';
import { getCustomers, resetCustomerError, updateCustomer } from '../../../redux/actions/customerActions';


import { useDispatch, useSelector } from 'react-redux';
import Alerts from '../../../components/Alerts';

export default function CustomerMain (props) {
    const {id} = props;
    const dispatch = useDispatch()
    
    const {
        customerList, isCustomerSuccess,
        isCustomerError, customerMessage 
    } = useSelector(state => state.customers)

    const {defaults, isDefaultError, defaultMessage} = useSelector(state =>  state.defaults)

    const [isLoading, setLoading] = useState(true)
    const [alerts, setAlerts ] = useState(null)

    const [tempProfile, setTempProfile] = useState(null);
    const [currentProfile, setCurrentProfile] = useState({address:{}})
    const [changes, setChanges] = useState(null)

    useEffect(() =>{
        if(customerList === null){
            dispatch(getCustomers())
        }

        if(customerList && id){
            setCurrentProfile(customerList.find(c => c._id === id))
        }

        if(defaults === null){
            dispatchEvent(getDefaults())
        }
    },[customerList, defaults, dispatch, id])

    useEffect(() => {
        if(customerList || (customerList && isCustomerSuccess)){
            setCurrentProfile(customerList.find(c => c._id === id))
            setLoading(false)
        } 

        if(isCustomerError || isDefaultError){
            let errors = []
            if(isDefaultError){
                errors.concat(defaultMessage)
                dispatch(resetDefaultError())
            }
            if(isCustomerError){
                errors.concat(customerMessage)
                dispatch(resetCustomerError())
            }
            setAlerts(errors)
        }
    },[
        id, customerList,
        dispatch, isCustomerError, isDefaultError, 
        customerMessage, defaultMessage
    ])


    const [value, setValue] = useState('Profile');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [profileDisabled, setProfileDisabled] = useState(true)
    const enableEdit = ()=> {
        setTempProfile(currentProfile);
        setProfileDisabled(false);
    }

    const cancelEdit = () => {
        setCurrentProfile(tempProfile);
        setProfileDisabled(true);
    }

    const onSaveProfile = () => {
        dispatch(updateCustomer(changes))
        setProfileDisabled(true)
        setTempProfile(null);
        setChanges(null)
    }

    const handleProfileChange = e => {
        const {name, value } = e.target;
        if(changes === null) setChanges({_id: currentProfile._id})
        if(name === 'firstName' || name === 'lastName' || name === 'middleName' 
            || name === 'ssn' || name === 'dateOfBirth' || name === 'gender' 
            || name === 'phone' || name === 'email'){
            setCurrentProfile({...currentProfile, [name]: value})
            setChanges({...changes, _id: currentProfile._id, [name]: value})
        } 
        else if(name === "street" || name === "aptNum" || name === "city" 
            || name === "state" || name === "country" || name === "zipcode"){
                setCurrentProfile({...currentProfile, address: {...currentProfile.address, [name]: value}})
                setChanges({
                    ...changes, 
                    _id: currentProfile._id,
                    address: {
                        ...changes.address, 
                        [name]: value}
                })
        }
    }

    const [tabs, setTabs] = useState([])
    const createVehicleTab = vehicle => {
        const label = `${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`
        console.info(currentProfile)
        if(!tabs.find(t => t.label === label)) {
            setTabs([...tabs, {
                label: label,
                panel: () => <VehicleDetails 
                    vehicleVin={vehicle.vin} 
                    customerId={currentProfile._id} 
                    />
            }])
            setValue(label)
        } 
        else {
            setValue(label)
        }
    }

    const handleCloseVehicleTab = label => {
        const newTabs = tabs.filter(t => t.label !== label)
        setTabs(newTabs)
    }

    useEffect(() => {
        if(tabs.length === 0){
            setValue("Profile");
        }
    },[tabs])
    
    return (
        <TabContext value={value}>
            {alerts ? <Paper><Alerts alerts={alerts}  /> </Paper> : null}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Paper sx={{p:0}}>
                    <TabList onChange={handleChange} variant="scrollable" >
                        <Tab label='Profile' value='Profile'/>
                        <Tab label='Vehicles' value='Vehicles'/>
                        {tabs.map (tab => (
                            <Tab 
                                key={tab.label}
                                icon={ <ClearIcon onClick={() => handleCloseVehicleTab(tab.label)} />}
                                iconPosition='end'
                                label={tab.label} value={tab.label}  
                            />
                        ))}
                    </TabList>
                </Paper>
            </Box>
            <TabPanel value="Profile" sx={{px: 0, py: 1, my: 0}}>
                {isLoading 
                    ?   <Loading  />
                    :   <CustomerProfile createVehicleTab={createVehicleTab} 
                            profile={currentProfile} profileDisabled={profileDisabled}
                            enableEdit={enableEdit} onSaveProfile={onSaveProfile}
                            cancelEdit={cancelEdit} handleProfileChange={handleProfileChange}
                        />
                }
            </TabPanel>
            <TabPanel value="Vehicles" sx={{px: 0, py: 1, my: 0}}>
                {isLoading
                    ?   <Loading  />
                    :   <CustomerVehicleTable 
                            handleSelection={createVehicleTab} 
                            profile={currentProfile} 
                            defaults={defaults} 
                            //context={useDefault}
                        />
                }
            </TabPanel>
            {tabs.map(tab => (
                <TabPanel key={tab.label} value={tab.label} sx={{px: 0, py: 1, my: 0}}>
                    {tab.panel()}
                </TabPanel>
            ))}
        </TabContext>
    )
}