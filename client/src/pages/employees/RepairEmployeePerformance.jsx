import React, {useState, useEffect, useContext} from 'react';
import {ServiceContext} from '../../context/service_context/ServiceState';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup, Typography,
    FormControlLabel, Radio
} from '@mui/material'

import {
    YTD_Repair, YTD_Commission,
    MTD_Repair, MTD_Commission
} from '../../utils/performanceUtils'

const RepairEmployeePerformance = () => {
    const {employeeId} = useParams();
    const serviceContext = useContext(ServiceContext)
    const {getServices, services} = serviceContext;

    const [dateRange, setDateRange] = useState('Current');
    const [ytdPerformance, setYTDPerformance] = useState(null)
    const [mtdPerformance, setMTDPerformance] = useState(null)
    const [lastYearPerformance, setLastYearPerformance] = useState(null)

    useEffect(() => {
        if(services === null){
            getServices()
        }

        if(employeeId && services){
            function customServices (start, end) {
                return services.filter(s => s.employee === employeeId
                    && new Date(s.date) >= start
                    && new Date(s.date) <= end
                )
            }

            const today = new Date()
            setYTDPerformance(customServices(
                new Date(`01/01/${new Date().getFullYear()}`),
                today
            ))
            
            setLastYearPerformance(customServices(
                    new Date(`01/01/${new Date().getFullYear() - 1}`),
                    new Date(`12/31/${new Date().getFullYear() - 1}`),
            ))
            
            setMTDPerformance(customServices(
                new Date(today.getFullYear(), today.getMonth(), 1),
                today
            ))
        }
    }, [employeeId, services, getServices])

    const handleChange = (event) => {
        setDateRange(event.target.value);
    };

    console.info('last year', lastYearPerformance)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p:0.5}}>
                    <FormControl>
                        <FormLabel align='left'>Performance Range</FormLabel>
                        <RadioGroup
                            value={dateRange} row
                            onChange={handleChange}>
                            <FormControlLabel value="Current" control={<Radio />} label="Current year" />
                            <FormControlLabel value="Prior" control={<Radio />} label="Prior Year" />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>

            {dateRange === 'Current'
            ?   <React.Fragment>
                    {ytdPerformance && 
                        <Grid item xs={12} md={6}>
                            <Paper >
                                <BarChart data={YTD_Repair(ytdPerformance)} />
                            </Paper>
                        </Grid>
                    }
                    
                    {mtdPerformance && 
                        <Grid item xs={12} md={6}>
                            <Paper >
                                <BarChart data={MTD_Repair(mtdPerformance)} /> 
                            </Paper>
                        </Grid>
                    }
                </React.Fragment>

            :  <Grid item xs={12}>
                    {lastYearPerformance && 
                        <Paper>
                            <Typography>{new Date().getFullYear() - 1}</Typography>
                            <BarChart data={YTD_Repair(lastYearPerformance)} />
                        </Paper>
                    }
                </Grid>
            }
        </Grid>
    )
}


export default RepairEmployeePerformance