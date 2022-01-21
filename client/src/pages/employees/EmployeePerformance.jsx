import React, {useState, useContext, useEffect} from 'react';
import {
    Paper, Grid, Radio, FormControl, 
    FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

import Loading from '../../components/Loading';


const Color = () => {
    const r = () => Math.random() * 256 >> 0;
    return `${r()}, ${r()}, ${r()}`;
}
function YTD_Sales(performance){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Sale",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {

        for (let i = 0; i < performance.length; i++){
            if(new Date(performance[i].saleDate).getFullYear() === 2021){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += performance[i].price;
            }
        }
    }
    return data;
}
function YTD_Commission(performance){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Commision",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {

        for (let i = 0; i < performance.length; i++){
            if(new Date(performance[i].saleDate).getFullYear() === 2021){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += performance[i].price * 0.05;
            }
        }
    }
    return data;
}

const GetMTDSales = () => {
    let sales = 0
    for(let i = 0; i < 5; i++){
        sales += (Math.floor(Math.random() * (25000 - 20000 + 1) + 20000))
    }

    return sales;
}

function MTD_Sales(sales){
    const date = new Date()

    const color = Color();
    
    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: "MTD Sale",
                data: [sales],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

function MTD_Commission(sales){
    const date = new Date()

    
    var color = Color();
    for(let i = 0; i < 5; i++){
        sales += (Math.floor(Math.random() * (25000 - 20000 + 1) + 20000))
    }

    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: "MTD Commission",
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

export default function EmployeePerformance (props) {
    const {employeeId} = props;
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;
    const [performance, setPerformance] = useState(null)

    const [chartType, setChartType] = useState('Sale');

    const handleChange = (event) => {
        setChartType(event.target.value);
    };

    useEffect(() => {
        if(employeeList === null){
            getEmployees()
        } else {
            setPerformance(
                employeeList.find(e => e._id === employeeId).performance
            )
        }
    },[employeeId, employeeList, getEmployees])

    const sales = GetMTDSales()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p:0.5}}>
                    <FormControl>
                        <FormLabel align='left'>Data Type</FormLabel>
                        <RadioGroup
                            value={chartType} row
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
                            <FormControlLabel value="Commission" control={<Radio />} label="Commission" />
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
            {chartType === 'Sale'
                ?   <Grid item xs={12} md={6}>
                        <Paper >
                            <BarChart data={YTD_Sales(performance)} />
                            
                        </Paper>
                    </Grid>
                :   <Grid item xs={12} md={6}>
                        <Paper >
                            <BarChart data={YTD_Commission(performance)} />
                            
                        </Paper>
                    </Grid>
            }
            {chartType === 'Sale'
                ?   <Grid item xs={12} md={6}>
                        <Paper >
                            <BarChart data={MTD_Sales(sales)} />
                        </Paper>
                    </Grid>
                :   <Grid item xs={12} md={6}>
                        <Paper >
                            <BarChart data={MTD_Commission(sales)} />
                        </Paper>
                    </Grid>
            }
            

        </Grid>
    )
}