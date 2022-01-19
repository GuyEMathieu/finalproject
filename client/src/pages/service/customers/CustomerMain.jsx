import {useState, useEffect, useContext} from 'react';
import {
    Box,
    Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';

import { getName } from '../../../utils/Formatter';

//#region Context
import {CustomerContext} from '../../../context/customer_context/CustomerState'
import {DefaultContext} from '../../../context/default_context/DefaultState'
//#endRegion

import ClearIcon from '@mui/icons-material/Clear';

import CustomerProfile from './CustomerProfile'
import CustomerVehicleTable from './CustomerVehicleTable';
import VehicleDetails from './VehicleDetails';

export default function CustomerMain (props) {
    const {id} = props;
    const customerContext = useContext(CustomerContext);
    const {
        customerList, getCustomerById, getCustomers, 
        currentCustomer, addNewVehicle, saveCustomer
    } = customerContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [tempProfile, setTempProfile] = useState(null);
    const [currentProfile, setCurrentProfile] = useState({address:{}})

    useEffect(() =>{
        if(customerList === null){
            getCustomers()
        }

        if(defaults === null){
            getAll()
        }
    },[customerList, getCustomers, defaults, getAll, ])

    useEffect(() => {
        if(currentCustomer === null || currentCustomer._id !== id){
            getCustomerById(id)
        } else {
            setCurrentProfile(currentCustomer)
        }
    },[currentCustomer, id, getCustomerById])

    const [value, setValue] = useState('Profile');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [profileDisabled, setProfileDisabled] = useState(true)
    const enableEdit = ()=> {
        setTempProfile(currentCustomer);
        setProfileDisabled(false);
    }

    const cancelEdit = () => {
        setCurrentProfile(tempProfile);
        setProfileDisabled(true);
    }

    const onSaveProfile = () => {
        saveCustomer(currentProfile)
        setProfileDisabled(true)
        setTempProfile(null);
    }

    const handleProfileChange = e => {
        const {name, value } = e.target;
        if(name === 'firstName' || name === 'lastName' || name === 'middleName' 
            || name === 'ssn' || name === 'dateOfBirth' || name === 'gender' 
            || name === 'phone' || name === 'email'){
            setCurrentProfile({...currentProfile, [name]: value})
        } 
        else if(name === "street" || name === "aptNum" || name === "city" 
            || name === "state" || name === "country" || name === "zipcode"){
                setCurrentProfile({...currentProfile, address: {...currentProfile.address, [name]: value}})
        }
    }

    const [tabs, setTabs] = useState([])
    const createVehicleTab = vehicle => {
        const label = `${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`

        if(tabs.filter(t => t.label === label)) {
            setTabs([...tabs, {
                label: label,
                panel: () => <VehicleDetails 
                        vehicle={vehicle} 
                        customerId={currentCustomer._id} 
                        customerContext={customerContext}
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

    const onSaveVehicle = (vehicle) => {
        addNewVehicle({vehicle, customer: currentProfile._id})
    }

    

    
    return (
            <TabContext value={value}>
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
                    <CustomerProfile createVehicleTab={createVehicleTab} 
                        profile={currentProfile} profileDisabled={profileDisabled}
                        enableEdit={enableEdit} onSaveProfile={onSaveProfile}
                        cancelEdit={cancelEdit} handleProfileChange={handleProfileChange}
                        />
                </TabPanel>
                <TabPanel value="Vehicles" sx={{px: 0, py: 1, my: 0}}>
                    <CustomerVehicleTable handleSelection={createVehicleTab} 
                        addNewVehicle={onSaveVehicle} 
                        handleProfileChange={handleProfileChange}
                        vehicles={currentProfile.vehicles} defaults={defaults} />
                </TabPanel>
                {tabs.map(tab => (
                    <TabPanel key={tab.label} value={tab.label} sx={{px: 0, py: 1, my: 0}}>
                        {tab.panel()}
                    </TabPanel>
                ))}
            </TabContext>
    )
}

