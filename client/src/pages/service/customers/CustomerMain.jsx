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

export default function CustomerMain (props) {
    const {id} = props;
    const customerContext = useContext(CustomerContext);
    const {customerList, getCustomerById, getCustomers, currentCustomer} = customerContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [currentProfile, setCurrentProfile] = useState({address:{}})

    useEffect(() =>{
        if(customerList === null){
            getCustomers()
        }

        if(defaults === null){
            getAll()
        }
    },[customerList, getCustomers, defaults, getAll])

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
        setProfileDisabled(false)
    }

    const onSaveProfile = () => {
        setProfileDisabled(true)
    }

    const [tabs, setTabs] = useState([])
    const createVehicleTab = vehicle => {
        const label = `${vehicle.year} ${getName(defaults.manufacturers, vehicle.make)} ${getName(defaults.models, vehicle.model)}`

        if(tabs.filter(t => t.label === label)) {
            setTabs([...tabs, {
                label: label,
                panel: () => <div>{label}</div>
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
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Paper sx={{p:0}}>
                        <TabList onChange={handleChange} variant="scrollable" >
                            <Tab label='profile' value='Profile'/>
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
                        enableEdit={enableEdit} onSaveProfile={onSaveProfile}/>
                </TabPanel>
                <TabPanel value="Vehicles" sx={{px: 0, py: 1, my: 0}}>
                    <CustomerVehicleTable handleSelection={createVehicleTab} 
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

