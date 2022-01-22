import React, {useState, useContext, useEffect} from 'react';
import {
    Grid, Radio, FormControl, Stack,
    FormControlLabel, RadioGroup, FormLabel, Typography
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

import BarChart from '../../components/charts/BarChart';
import TeamTable from './TeamTable';
import Loading from '../../components/Loading';
import AccordionShell from '../../components/AccordionShell';
const Color = () => {
    const r = () => Math.random() * 256 >> 0;
    return `${r()}, ${r()}, ${r()}`;
}

//#region TEAM
function TeamYTDSale(team){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Sale`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(team) {
        let today = new Date();
        
        if(today.getMonth() === 0){
            for(let i = 0; i < team.length; i++){
                const teamMember = team[i]
                for (let x = 0; x < teamMember.performance.length; x++){
                    if(new Date(teamMember.performance[x].saleDate).getFullYear() === today.getUTCFullYear() - 1){
                        let color = Color()
                        data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                        data.datasets[0].borderColor.push(`rgb(${color})`)
                        const month = new Date(teamMember.performance[x].saleDate).getMonth();
                        data.datasets[0].data[month] += teamMember.performance[x].price;
                    }
                }
            }
            data.datasets[0].label = `YTD Sale (${(today.getFullYear() - 1)})`
        } else {
            const start = new Date(`01/01/${today.getFullYear()}`)
            for(let i = 0; i < team.length; i++){
                const teamMember = team[i]
                for (let x = 0; x < teamMember.performance.length; x++){
                    const performance = teamMember.performance[x];
                    if(new Date(performance.saleDate) >= start 
                        && new Date(performance.saleDate) <= today){
                        let color = Color()
                        data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                        data.datasets[0].borderColor.push(`rgb(${color})`)
                        const month = new Date(performance.saleDate).getMonth();
                        data.datasets[0].data[month] += performance.price;
                    }
                }
            }
            data.datasets[0].label = `YTD Sale (${(today.getFullYear() - 1)})`
        }
    }
    return data;
}

function TeamYTDCommission(team){
    const today = new Date();
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Commission`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(team) {
        if(today.getMonth() === 0){
            for(let i = 0; i < team.length; i++){
                const teamMember = team[i]
                for (let x = 0; x < teamMember.performance.length; x++){
                    const performance = teamMember.performance[x]
                    if(new Date(performance.saleDate).getFullYear() === today.getFullYear() - 1){
                        let color = Color()
                        data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                        data.datasets[0].borderColor.push(`rgb(${color})`)
                        const month = new Date(performance.saleDate).getMonth();
                        data.datasets[0].data[month] += performance.price * 0.05;
                    }
                }
            }
            data.datasets[0].label = `YTD Commission (${today.getFullYear() -1})`
        } else {
            const start = new Date(`01/01/${today.getFullYear()}`);
            
            for(let i = 0; i < team.length; i++){
                const teamMember = team[i]
                for (let x = 0; x < teamMember.performance.length; x++){
                    const performance = teamMember.performance[x]
                    if(new Date(performance.saleDate) >= start && new Date(performance.saleDate) <= today){
                        let color = Color()
                        data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                        data.datasets[0].borderColor.push(`rgb(${color})`)
                        const month = new Date(performance.saleDate).getMonth();
                        data.datasets[0].data[month] += performance.price * 0.05;
                    }
                }
            }
        }
    }
    return data;
}

function TeamMTDSale(team){

    const today = new Date();
    const start = new Date();

    start.setDate(1)

    let sales = 0;

    for(let i = 0; i < team.length; i++){
        const performance = team[i].performance;
        for(let x = 0; x < performance.length; x++){
            const _sale = performance[x];
            if(new Date(_sale.saleDate) >= start
            && new Date(_sale.saleDate) <= today){
                sales += _sale.price
            }
        }
    }

    const color = Color();
    const month = [today.toLocaleString('default', { month: 'short' })]
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
function TeamMTDCommission(team){

    const today = new Date();
    const start = new Date();
    start.setDate(1)

    let sales = 0;

    for(let i = 0; i < team.length; i++){
        const performance = team[i].performance;
        for(let x = 0; x < performance.length; x++){
            const _sale = performance[x];
            if(new Date(_sale.saleDate) >= start
            && new Date(_sale.saleDate) <= today){
                sales += _sale.price
            }
        }
    }

    const color = Color();
    const month = today.toLocaleString('default', { month: 'short' });

    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Commission (${month})`,
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }

    return data
}
//#endregion

//#region Employee Charts
function EmployeeYTDSale(performance){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Sale`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }

    const today = new Date();
    let start = new Date();
    start.setDate(1);

    if(today.getMonth() === 0){
        for(let i = 0; i < performance.length; i++){
            if(new Date(performance[i].saleDate).getFullYear() === today.getFullYear() - 1){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += performance[i].price;
            }
        }
        data.datasets[0].label = `YTD Sale (${today.getFullYear() -1})`
    } else {
        start = new Date(`01/01/${today.getFullYear()}`)
        for(let i = 0; i < performance.length; i++){
            if(new Date(performance[i].saleDate >= start && new Date(performance[i].saleDate <=today))){
                let color = Color()
                data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
                data.datasets[0].borderColor.push(`rgb(${color})`)
                const month = new Date(performance[i].saleDate).getMonth();
                data.datasets[0].data[month] += performance[i].price;
            }
        }
        data.datasets[0].label = `YTD Sale (${today.getFullYear()})`
    }
    return data;
}
function EmployeeYTDCommission(performance){
    
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: `YTD Commission`,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    
    for(let i = 0; i < performance.length; i++){
        if(new Date(performance[i].saleDate).getFullYear() === 2021){
            let color = Color()
            data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
            data.datasets[0].borderColor.push(`rgb(${color})`)
            const month = new Date(performance[i].saleDate).getMonth();
            data.datasets[0].data[month] += performance[i].price * 0.05;
        }
    }

    return data;
}

function EmployeeMTDSale(performance){
    const today = new Date();
    const start = new Date();
    start.setDate(1)
    const color = Color();

    let sales = 0;

    for(let x = 0; x < performance.length; x++){
        const _sale = performance[x];
        if(new Date(_sale.saleDate) >= start
        && new Date(_sale.saleDate) <= today){
            sales += _sale.price
        }
    }
    
    
    let data = {
        labels: [today.toLocaleString('default', { month: 'short' })],
        datasets: [
            {
                label: `MTD Sale (${[today.toLocaleString('default', { month: 'short' })]})`,
                data: [sales],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}
function EmployeeMTDCommission(performance){
    const today = new Date();
    const start = new Date();
    start.setDate(1)
    const color = Color();

    let sales = 0;

    for(let x = 0; x < performance.length; x++){
        const _sale = performance[x];
        if(new Date(_sale.saleDate) >= start
        && new Date(_sale.saleDate) <= today){
            sales += _sale.price
        }
    }
    
    
    let data = {
        labels: [today.toLocaleString('default', { month: 'short' })],
        datasets: [
            {
                label: `MTD Commission (${[today.toLocaleString('default', { month: 'short' })]})`,
                data: [sales * 0.05],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
}
//#endregion

export default function ManagerPerformance (props) {
    const {employeeId, teamNumber} = props;
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;

    const [team, setTeam] = useState(null)

    const [chartType, setChartType] = useState('Sale');

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
        setSelectedEmployee(employee)
    }

    const [expanded, setExpanded] = useState('Team Performance')
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Stack spacing={2}>
            <AccordionShell 
                handleChange={handleChange}
                expanded={expanded} 
                title={'Team Performance'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                        {team 
                            ? (chartType === 'Sale' 
                                ?   <BarChart data={TeamYTDSale(team)} />
                                :   <BarChart data={TeamYTDCommission(team)} />
                            ): <Loading  />
                        } 
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {team 
                            ? (chartType === 'Sale' 
                                ?   <BarChart data={TeamMTDSale(team)} />
                                :   <BarChart data={TeamMTDCommission(team)} />
                            ): <Loading  />
                        } 
                    </Grid>
                </Grid>
            </AccordionShell> 

            <AccordionShell 
                handleChange={handleChange}
                expanded={expanded} 
                title={'Individual Performance'}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        {selectedEmployee ? <Typography> {selectedEmployee.firstName} {selectedEmployee.lastName}</Typography> : null}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {selectedEmployee 
                            ? (chartType === 'Sale'
                                ?   <BarChart data={EmployeeYTDSale(selectedEmployee.performance)} /> 
                                :   <BarChart data={EmployeeYTDCommission(selectedEmployee.performance)} />
                            ): null
                        }
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {selectedEmployee 
                            ? (chartType === 'Sale' 
                                ?   <BarChart data={EmployeeMTDSale(selectedEmployee.performance)} /> 
                                :   <BarChart data={EmployeeMTDCommission(selectedEmployee.performance)} />
                            ): null
                        }
                    </Grid>
                    

                    


                    <Grid item xs={12} >
                        {team ? <TeamTable team={team} handleSelection={handleSelection}/> : <Loading  /> }
                    </Grid> 
                </Grid>

            </AccordionShell>
        </Stack>
    )
}
