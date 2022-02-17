import {useState, useEffect} from 'react';
import {
    Box, Tab, Paper
} from '@mui/material';
import {
    TabContext, TabList, TabPanel 
} from '@mui/lab';

import ClearIcon from '@mui/icons-material/Clear';

export default function DynamicTabs(props) {
    const {data, handleClose} = props;

    const [tabs, setTabs] = useState([])

    const [value, setValue] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() =>{
        if(data){
            setTabs(data)
            
            if(value === null || data.length === 1){
                setValue(data[data.length - 1].label)
            }
        }
    }, [data, setTabs, value])

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Paper sx={{p:0}}>
                    <TabList onChange={handleChange} >
                        
                        {tabs.map (tab => (
                            <Tab 
                                icon={ tab.isInteractable 
                                    ? <ClearIcon onClick={() => handleClose(tab.label)} />
                                    : null
                                }
                                iconPosition='end'
                                label={tab.label} value={tab.label}  
                            />
                        ))}
                    </TabList>
                </Paper>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            {tabs.map(tab => (
                <TabPanel value={tab.label} sx={{px: 0, py: 0, my: 0}}>
                    {tab.panel()}
                </TabPanel>
            ))}
        </TabContext>
    );
}
