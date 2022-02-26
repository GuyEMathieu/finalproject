import {useState, useEffect} from 'react';
import {
    Box,
    Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';


import ClearIcon from '@mui/icons-material/Clear';
import MainContainer from '../../components/MainContainer'


import CustomerSearch from './customers/CustomerSearch'
import CustomerMain from './customers/CustomerMain'

export default function Service () {
    const [value, setValue] = useState('Customers');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = useState([])
    const createCustomerTab = customer => {

        if(tabs.filter(t => t.label === `${customer.firstName} ${customer.lastName}`).length === 0) {
            setTabs([...tabs, {
                label: `${customer.firstName} ${customer.lastName}`,
                panel: () => <CustomerMain id={customer._id}  />
            }])
            setValue(`${customer.firstName} ${customer.lastName}`)
        } 
        else {
            setValue(`${customer.firstName} ${customer.lastName}`)
        }
    }

    const handleCloseCustomerTab = label => {
        const newTabs = tabs.filter(t => t.label !== label)
        setTabs(newTabs)
    }

    useEffect(() => {
        if(tabs.length === 0){
            setValue("Customers");
        }
    },[tabs])
    return (
        <MainContainer title='Customers'>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Paper sx={{p:0}}>
                        <TabList onChange={handleChange} variant="scrollable" >
                            <Tab label='Customers' value='Customers'/>
                            {tabs.map (tab => (
                                <Tab 
                                    key={tab.label}
                                    icon={ <ClearIcon onClick={() => handleCloseCustomerTab(tab.label)} />}
                                    iconPosition='end'
                                    label={tab.label} value={tab.label}  
                                />
                            ))}
                        </TabList>
                    </Paper>
                </Box>
                <TabPanel value="Customers" sx={{px: 0, py: 0, my: 0}}>
                    <CustomerSearch createCustomerTab={createCustomerTab} /> 
                </TabPanel>
                {tabs.map(tab => (
                    <TabPanel key={tab.label} value={tab.label} sx={{px: 0, py: 1, my: 0}}>
                        {tab.panel()}
                    </TabPanel>
                ))}
            </TabContext>
        </MainContainer>
    )
}


