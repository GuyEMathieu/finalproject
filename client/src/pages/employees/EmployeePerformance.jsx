import React, {useState, useContext, useEffect} from 'react';
import {
    Paper, Grid, Radio, FormControl, 
    FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

import BarChart from '../../components/charts/BarChart';

const Color = () => {
    const r = () => Math.random() * 256 >> 0;
    return `${r()}, ${r()}, ${r()}`;
}

function YTD_Sales(performance){
    const today = new Date();
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
        if(today.getMonth() === 0){
            for (let i = 0; i < performance.length; i++){
                const perf = performance[i];
                if(new Date(perf.saleDate).getFullYear() === today.getFullYear() - 1){
                    let color = Color()
                    data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                    data.datasets[0].borderColor.push(`rgb(${color})`)
                    const month = new Date(perf.saleDate).getMonth();
                    data.datasets[0].data[month] += perf.price;
                }
            }
            data.datasets[0].label = `YTD Sale ${today.getFullYear() - 1} (Will display prior year's data if current month is Jan)`
        } else {
            const start = new Date(`01/01/${today.getFullYear()}`)
            for (let i = 0; i < performance.length; i++){
                const perf = performance[i];
                if(new Date(perf.saleDate) >= new Date(start) 
                    && new Date(perf.saleDate) <= today){
                    let color = Color()
                    data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                    data.datasets[0].borderColor.push(`rgb(${color})`)
                    const month = new Date(perf.saleDate).getMonth();
                    data.datasets[0].data[month] += perf.price;
                }
            }
            data.datasets[0].label = `YTD Sale (${today.getFullYear()})`
        }
    }
    return data;
}

function YTD_Commission(performance){
    const today = new Date();
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
        if(today.getMonth() === 0){
            for (let i = 0; i < performance.length; i++){
                const perf = performance[i];
                if(new Date(perf.saleDate).getFullYear() === today.getFullYear() - 1){
                    let color = Color()
                    data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                    data.datasets[0].borderColor.push(`rgb(${color})`)
                    const month = new Date(perf.saleDate).getMonth();
                    data.datasets[0].data[month] += perf.price * 0.05;
                }
            }
            data.datasets[0].label = `YTD Sale ${today.getFullYear() - 1} (Will display prior year's data if current month is Jan)`
        } else {
            const start = new Date(`01/01/${today.getFullYear()}`)
            for (let i = 0; i < performance.length; i++){
                const perf = performance[i];
                if(new Date(perf.saleDate) >= new Date(start) 
                    && new Date(perf.saleDate) <= today){
                    let color = Color()
                    data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                    data.datasets[0].borderColor.push(`rgb(${color})`)
                    const month = new Date(perf.saleDate).getMonth();
                    data.datasets[0].data[month] += perf.price * 0.05;
                }
            }
            data.datasets[0].label = `YTD Sale (${today.getFullYear()})`
        }
    }
    return data;
}

function MTD_Sales(performance){
    const today = new Date()
    const start = today;
    start.setDate(1);
    const color = Color();

    let sales = 0;
    if(performance){
        const filtered = performance.filter(
            (p => new Date(p.saleDate) >= start)
            && (p => new Date(p.saleDate) <= today)
        )
        console.info(filtered)
        for(let i = 0; i < filtered.length; i++){
                sales += filtered[i].price
        }
    }
    
    const month = today.toLocaleString('default', { month: 'short' });
    
    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Sale (${month})`,
                data: [sales],
                backgroundColor: [`rgba(${color}, 0.4)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

function MTD_Commission(performance){
    const today = new Date()
    const start = today;
    start.setDate(1);
    const color = Color();

    let sales = 0;
    if(performance){
        const filtered = performance.filter(
            (p => new Date(p.saleDate) >= start)
            && (p => new Date(p.saleDate) <= today)
        )
        for(let i = 0; i < filtered.length; i++){
                sales += filtered[i].price * 0.05
        }
    }
    
    const month = today.toLocaleString('default', { month: 'short' });
    
    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Sale (${month})`,
                data: [sales],
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p:0.5}}>
                    <FormControl>
                        <FormLabel align='left'>Data Type</FormLabel>
                        <RadioGroup
                            value={chartType} row
                            onChange={handleChange}>
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
                            <BarChart data={MTD_Sales(performance)} />
                        </Paper>
                    </Grid>
                :   <Grid item xs={12} md={6}>
                        <Paper >
                            <BarChart data={MTD_Commission(performance)} />
                        </Paper>
                    </Grid>
            }
        </Grid>
    )
}