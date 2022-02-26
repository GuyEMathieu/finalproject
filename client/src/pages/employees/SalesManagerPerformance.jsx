import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
//import DoughnutChart from '../../components/charts/PieChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup, 
    FormControlLabel, Radio, Typography
} from '@mui/material'
import {
    Team_YTD_Sales, Team_YTD_Commission,
    Team_MTD_Sales, Team_MTD_Commission,
} from '../../utils/performanceUtils'
import { useDispatch, useSelector } from 'react-redux';

import {getEmployees} from '../../redux/actions/employeeActions'
import { getSales } from '../../redux/actions/saleActions';

export default function SalesManagerPerformance() {
    const {employeeId} = useParams();
    const dispatch = useDispatch()
    const {employeeList} = useSelector(state => state.employees)
    const {salesList} = useSelector(state => state.sales)
    

    const [chartType, setChartType] = useState('Sale');

    const handleChange = (event) => {
        setChartType(event.target.value);
    };
    
    const [ytdSale, setYTDSale] = useState(null)
    const [mtdSale, setMTDSale] = useState(null)
    const [lastYear, setLastYear] = useState(null)
    const [showPriorYear, setShowPriorYear] = useState('no');

    const handleShowLastYear = (event) => {
        setShowPriorYear(event.target.value);
    };

    useEffect(() => {
        if(!salesList){
            dispatch(getSales());
        }

        if(employeeList === null){
            dispatch(getEmployees());
            console.info(employeeList)
        }

        if(salesList && performance && employeeList) {
            
            const manager = employeeList.find(e => e._id === employeeId);
            
            const teamSalesPerson = employeeList.filter(e => e.employmentInfo.team === manager.employmentInfo.team
                && e._id !== employeeId
            );

            let teamSales = [];
            function getSales (member, sales, start, end){
                return {
                    name: `${member.firstName} ${member.lastName}`,
                    performance: sales.filter(s => s.soldBy === member._id
                        && new Date(s.purchaseDate) >= start
                        && new Date(s.purchaseDate) <= end
                    )
                } 
            }
            const today = new Date()
            for(let i = 0; i < teamSalesPerson.length; i++){
                const memberSales = getSales(
                        teamSalesPerson[i],
                        salesList,
                        new Date(`01/01/${new Date().getFullYear()}`),
                        today
                    )
                teamSales.push(memberSales)
            }
            setYTDSale(teamSales)

            teamSales = [];
            for(let i = 0; i < teamSalesPerson.length; i++){
                const memberSales = getSales(
                        teamSalesPerson[i],
                        salesList,
                        new Date(today.getFullYear(), today.getMonth(),1),
                        today
                    )
                teamSales.push(memberSales)
            }
            setMTDSale(teamSales)

            teamSales = [];
            for(let i = 0; i < teamSalesPerson.length; i++){
                const memberSales = getSales(
                        teamSalesPerson[i],
                        salesList,
                        new Date(`01/01/${new Date().getFullYear() - 1}`),
                        new Date(`12/31/${new Date().getFullYear() - 1}`),
                    )
                teamSales.push(memberSales)
            }
            setLastYear(teamSales)
        }
    },[salesList, employeeId, employeeList, dispatch])

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
                ?   <React.Fragment>
                        <Grid item xs={12} md={6}>
                            <Paper >
                                <Typography>Y-T-D</Typography>
                                {chartType === 'Sale' 
                                    ?   <BarChart data={Team_YTD_Sales(ytdSale)} /> : <BarChart data={Team_YTD_Commission(ytdSale)} />
                                }
                            </Paper>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Paper >
                                <Typography>M-T-D</Typography>
                                {chartType === 'Sale' 
                                    ?   <BarChart data={Team_MTD_Sales(mtdSale)} /> : <BarChart data={Team_MTD_Commission(mtdSale)} />
                                }
                            </Paper>
                        </Grid>
                    </React.Fragment>
                :   <React.Fragment>
                        <Grid item xs={12}>
                            <Paper>
                            <Typography>{new Date().getFullYear() - 1} Sales & Commission</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper>
                                <Typography>{new Date().getFullYear() - 1} Sales</Typography>
                                <BarChart data={Team_YTD_Sales(lastYear)} />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper>
                                <Typography>{new Date().getFullYear() - 1} Commissions</Typography>
                                <BarChart data={Team_YTD_Commission(lastYear)} />
                            </Paper>
                        </Grid>
                    </React.Fragment>
            }
        </Grid>
    )
}
