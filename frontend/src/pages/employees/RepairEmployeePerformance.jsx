import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup, Typography,
    FormControlLabel, Radio
} from '@mui/material'

import {YTD_Repair, MTD_Repair} from '../../utils/performanceUtils'
import {getServices} from '../../redux/actions/serviceActions';

import { useSelector, useDispatch } from 'react-redux';

export default function RepairEmployeePerformance () {
    const {employeeId} = useParams();
    const dispatch = useDispatch()
    const {serviceList} = useSelector(state => state.services)

    const [dateRange, setDateRange] = useState('Current');
    const [ytdPerformance, setYTDPerformance] = useState(null)
    const [mtdPerformance, setMTDPerformance] = useState(null)
    const [lastYearPerformance, setLastYearPerformance] = useState(null)

    useEffect(() => {
        if(serviceList === null){
            dispatch(getServices())
        }

        if(employeeId && serviceList){
            function customServices (start, end) {
                return serviceList.filter(s => s.employee === employeeId
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
    }, [employeeId, serviceList, dispatch])

    const handleChange = (event) => {
        setDateRange(event.target.value);
    };


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

            :   <Grid item xs={12} lg={6}>
                    {lastYearPerformance && 
                        <Paper>
                            <BarChart data={YTD_Repair(lastYearPerformance)} />
                        </Paper>
                    }
                </Grid>
            }
        </Grid>
    )
}

