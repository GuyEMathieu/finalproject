import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup,
    FormControlLabel, Radio, Divider
} from '@mui/material'
import {
    YTD_Sales, YTD_Commission,
    MTD_Sales, MTD_Commission
} from '../../utils/performanceUtils'

import {getSales} from '../../redux/actions/saleActions'
import { useDispatch, useSelector } from 'react-redux';
function SalesEmployeePerformance() {
    const dispatch = useDispatch()
    const {employeeId} = useParams();
    const {salesList} = useSelector(state => state.sales)
    

    const [chartType, setChartType] = useState('Sale');

    const handleChange = (event) => {
        setChartType(event.target.value);
    };
    
    const [ytdSale, setYTDSale] = useState(null)
    const [mtdSale, setMTDSale] = useState(null)
    const [lastYear, setLastYear] = useState(null)
    const [showPriorYear, setShowPriorYear] = useState('no')

    const handleShowLastYear = (event) => {
        setShowPriorYear(event.target.value);
    };

    useEffect(() => {
        if(!salesList){
            dispatch(getSales());
        }

        if(salesList && performance ) {
            setLastYear(salesList.filter(s =>
                s.soldBy === employeeId
                && new Date(s.purchaseDate) >= new Date(`01/01/${new Date().getFullYear() - 1}`)
                && new Date(s.purchaseDate) <= new Date(`12/31/${new Date().getFullYear() - 1}`) 
            ))

            setYTDSale(salesList.filter(s => 
                s.soldBy === employeeId 
                && new Date(s.purchaseDate) >= new Date(`01/01/${new Date().getFullYear()}`)
                && new Date(s.purchaseDate) <= new Date()
            ));

            const today = new Date()
            setMTDSale(salesList.filter(s =>
                s.soldBy === employeeId 
                && new Date(s.purchaseDate) >= new Date(today.getFullYear(), today.getMonth(), 1)
                && new Date(s.purchaseDate) <= today
            ))
        }

    },[salesList, employeeId, dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p:0.5}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel align='left'>Data Type</FormLabel>
                                <RadioGroup
                                    value={chartType} row
                                    onChange={handleChange}>
                                    <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
                                    <FormControlLabel value="Commission" control={<Radio />} label="Commission" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel align='left'>Show last Year</FormLabel>
                                <RadioGroup
                                    value={showPriorYear} row
                                    onChange={handleShowLastYear}>
                                    <FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={'no'} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {showPriorYear === 'no' 
                ?
                <React.Fragment>
                    {chartType === 'Sale'
                        ?   <Grid item xs={12} md={6}>
                                <Paper >
                                    <BarChart data={YTD_Sales(ytdSale)} />
                                </Paper>
                            </Grid>
                        :   <Grid item xs={12} md={6}>
                                <Paper >
                                    <BarChart data={YTD_Commission(ytdSale)} />
                                </Paper>
                            </Grid>
                        }

                        {chartType === 'Sale'
                            ?   <Grid item xs={12} md={6}>
                                    <Paper >
                                        <BarChart data={MTD_Sales(mtdSale)} />
                                    </Paper>
                                </Grid>
                            :   <Grid item xs={12} md={6}>
                                    <Paper >
                                        <BarChart data={MTD_Commission(mtdSale)} />
                                    </Paper>
                                </Grid>
                        }
                    </React.Fragment>
                :   <React.Fragment>
                        <Grid item xs={12}>
                            <Divider> Year {new Date().getFullYear() -1}</Divider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper >
                                <BarChart data={YTD_Sales(lastYear)} />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper >
                                <BarChart data={YTD_Commission(lastYear)} />
                            </Paper>
                        </Grid>
                    </React.Fragment>
            }
        </Grid>
    )
}

export default SalesEmployeePerformance