import React, {useState, useContext, useEffect} from 'react';
import {
    Paper, Grid, Radio, FormControl, 
    FormControlLabel, RadioGroup, FormLabel
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

import BarChart from '../../components/charts/BarChart';
import TeamTable from './TeamTable';

const Color = () => {
    const r = () => Math.random() * 256 >> 0;
    return `${r()}, ${r()}, ${r()}`;
}

const GetMTDSales = () => {
    let sales = 0
    for(let i = 0; i < 5; i++){
        sales += (Math.floor(Math.random() * (25000 - 20000 + 1) + 20000))
    }

    return sales;
}


function YTD_Sales(teamMember){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Sale -- ${teamMember.firstName} ${teamMember.lastName}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {

        for (let i = 0; i < teamMember.performance.length; i++){
            if(new Date(teamMember.performance[i].saleDate).getFullYear() === 2021){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(teamMember.performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += teamMember.performance[i].price;
            }
        }
    }
    return data;
}
function YTD_Commission(teamMember){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Commision -- ${teamMember.firstName} ${teamMember.lastName}`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {

        for (let i = 0; i < teamMember.performance.length; i++){
            if(new Date(teamMember.performance[i].saleDate).getFullYear() === 2021){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(teamMember.performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += teamMember.performance[i].price * 0.05;
            }
        }
    }
    return data;
}





function MTD_Sales(teamMember, sales){
    const date = new Date()

    const color = Color();
    
    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: `MTD Sale -- ${teamMember.firstName} ${teamMember.lastName}`,
                data: [sales],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

function MTD_Commission(teamMember, sales){
    const date = new Date()
    const color = Color();

    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: `MTD Commission -- ${teamMember.firstName} ${teamMember.lastName}`,
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

function YTD_Collective_Commission(team){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Collective Commision`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(team) {
        for(let i = 0; i < team.length; i++){
            const teamMember = team[i]
            for (let x = 0; x < teamMember.performance.length; x++){
                if(new Date(teamMember.performance[x].saleDate).getFullYear() === 2021){
                    let color = Color()
                    data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                    data.datasets[0].borderColor.push(`rgb(${color})`)
                    const month = new Date(teamMember.performance[x].saleDate).getMonth();
                    data.datasets[0].data[month] += teamMember.performance[x].price * 0.05;
                }
            }
        }
    }
    return data;
}
function YTD_Collective_Sale(team){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Collective Sale`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(team) {
        // for(let i = 0; i < team.length; i++){
        //     const teamMember = team[i]
        //     for (let x = 0; x < teamMember.performance.length; x++){
        //         if(new Date(teamMember.performance[x].saleDate).getFullYear() === 2021){
        //             let color = Color()
        //             data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
        //             data.datasets[0].borderColor.push(`rgb(${color})`)
        //             const month = new Date(teamMember.performance[x].saleDate).getMonth();
        //             data.datasets[0].data[month] += teamMember.performance[x].price;
        //         }
        //     }
        // }
    }
    return data;
}
function MTD_Collective_Commission(sales){
    const date = new Date()
    const color = Color();

    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: `MTD Team Commission`,
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}
function MTD_Collective_Sales(sales){
    const date = new Date()
    const color = Color();

    let data = {
        labels: [date.toLocaleString('default', { month: 'long' })],
        datasets: [
            {
                label: `MTD Team Salee`,
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}

export default function ManagerPerformance (props) {
    const {employeeId, teamNumber} = props;
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;

    const [team, setTeam] = useState(null)

    const [chartType, setChartType] = useState('Sale');
    const [dateRange, setDateRange] = useState('YTD');

    useEffect(() => {
        if(employeeList === null){
            getEmployees()
        } else {
            setTeam(
                employeeList.filter(e => e.team === teamNumber && e._id !== employeeId)
            )
        }
    },[employeeId, employeeList, getEmployees, teamNumber])

    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const handleSelection = employee => {
        alert(JSON.stringify(employee, null, 4))
        setSelectedEmployee(employee)
    }

    function YTDChart({chartType, member}) {
        return chartType === 'Sale' 
            ? <BarChart data={YTD_Sales(member)} /> 
            : <BarChart data={YTD_Commission(member)} /> 
    }

    // function MTDChart({chartType, member, sales}) {
    //     return chartType === 'Sale' 
    //         ? <BarChart data={MTD_Sales(member, sales = GetMTDSales())} /> 
    //         : <BarChart data={MTD_Commission(member, sales = GetMTDSales())}/> 
    // }
    // function YTDCollectiveChart(chartType, team) {
    //     return chartType === 'Sale' 
    //         ? <BarChart data={YTD_Collective_Sale(team)} /> 
    //         : <BarChart data={YTD_Collective_Commission(team)}/> 
    // }
    // function MTDCollectiveChart(chartType) {
    //     let sales = 0;
    //     for(let i = 0; i < team.lenth; i++){
    //         sales += GetMTDSales();
    //     }
    //     return chartType === 'Sale' 
    //         ? <BarChart data={MTD_Collective_Sales(sales)} /> 
    //         : <BarChart data={MTD_Collective_Commission(sales)}/> 
    // }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Paper sx={{p:0.5}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel align='left'>Data Type</FormLabel>
                                <RadioGroup
                                    value={chartType} row
                                    onChange={e => setChartType(e.target.value)}
                                >
                                    <FormControlLabel value="Sale" control={<Radio />} label="Sale" />
                                    <FormControlLabel value="Commission" control={<Radio />} label="Commission" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel align='left'>Date Range</FormLabel>
                                <RadioGroup
                                    value={dateRange} row
                                    onChange={e => setDateRange(e.target.value)}
                                >
                                    <FormControlLabel value="YTD" control={<Radio />} label="YTD" />
                                    <FormControlLabel value="MTD" control={<Radio />} label="MTD" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Grid item xs={12} md={5}>
                    <TeamTable team={team} handleSelection={handleSelection}/>
                </Grid>
                
                <Grid item xs={12} md={7}>
                    {selectedEmployee &&  
                        <div>
                            <BarChart data={YTDChart(selectedEmployee)} chartType={chartType} />
                        </div>
                    }
                </Grid>
            </Grid>



            

        </Grid>
    )
}