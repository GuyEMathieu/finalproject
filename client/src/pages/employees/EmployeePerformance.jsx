import React, {useState, useContext, useEffect} from 'react';
import {
    Grid, FormControlLabel, 
    FormControl, FormLabel,
    RadioGroup, Radio, Paper,
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

import BarChart from '../../components/charts/BarChart';
import DoughnutChart from '../../components/charts/DoughnutChart';
import PieChart from '../../components/charts/PieChart';

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }
    ]
};

function YTD(dataSet){
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'
        ],
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)',
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)'
        ],
        borderWidth: 1
    }

    return data;
}
export default function EmployeePerformance (props) {
    const {employeeId} = props;
    const employeeContext = useContext(EmployeeContext);
    const {salesPerformance} = employeeContext;
    const [performance, setPerformance] = useState(null)

    useEffect(() => {
        setPerformance(salesPerformance.filter(p => p.employeeId === employeeId))
    },[employeeId, salesPerformance])

    const [chartType, setChartType] = useState('Doughnut')
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper sx={{p:1}}>
                    <FormControl sx={{backgroundColor: 'yellow'}} align='left'>
                        <FormLabel id="demo-row-radio-buttons-group-label" align='start'>Gender</FormLabel>
                        <RadioGroup row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={chartType}
                            onChange={e => setChartType(e.target.value)}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="Bar" control={<Radio />} label="Bar" />
                            <FormControlLabel value="Doughnut" control={<Radio />} label="Doughnut" />
                            <FormControlLabel value="PieChart" control={<Radio />} label="Pie" />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
            {[1,2].map(ele => (
                <Grid item xs={12} md={6} key={ele}>
                    <Paper>
                    {chartType === 'Bar' 
                        ? <BarChart data={data}  />
                        : chartType === 'Doughnut' ? <DoughnutChart data={data} />
                        : <PieChart data={data}  />
                    }
                    </Paper>
                </Grid>
            ))}
            {/* {[1,2,3,4].map(ele => (
                <Grid item xs={12} md={2} lg={4} key={ele}>
                    <BarChart data={data}  />
                </Grid>
            ))} */}
            
        </Grid>
    )
}