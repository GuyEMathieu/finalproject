import React, {useState, useEffect, useContext} from 'react';
import {SalesContext} from '../../context/sales_context/SaleState';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
//import DoughnutChart from '../../components/charts/PieChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup,
    FormControlLabel, Radio, Divider
} from '@mui/material'
import { EmployeeContext } from '../../context/employee_context/EmployeeState';


function ManagerPerformance() {
    const {employeeId} = useParams();
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;

    const salesContext = useContext(SalesContext);
    const {sales, getSales} = salesContext;

    const [chartType, setChartType] = useState('Sale');

    const handleChange = (event) => {
        setChartType(event.target.value);
    };
    


    const [ytdSale, setYTDSale] = useState(null)
    const [mtdSale, setMTDSale] = useState(null)
    const [lastYear, setLastYear] = useState(null)
    const [showPriorYear, setShowPriorYear] = useState('no');

    const [team, setTeam] = useState(null)

    const handleShowLastYear = (event) => {
        setShowPriorYear(event.target.value);
    };

    useEffect(() => {
        if(!sales){
            getSales();
        }

        if(employeeList === null){
            getEmployees();
            console.info(employeeList)
        }

        if(sales && performance && employeeList) {
            
            const manager = employeeList.find(e => e._id === employeeId);
            
            const teamSalesPerson = employeeList.filter(e => e.employmentInfo.team === manager.employmentInfo.team
                && e._id !== employeeId
            );

            const teamSales = [];

            function getSales (member, sales, start, end){
                return {
                    name: `${member.firstName} ${member.lastName}`,
                    performance: sales.filter(s => s.soldBy === member._id
                        && new Date(s.purchaseDate) >= start //new Date(`01/01/${new Date().getFullYear() - 1}`)
                        && new Date(s.purchaseDate) <= end
                    )
                } 
            }

            for(let i = 0; i < teamSalesPerson.length; i++){
                const memberSales = getSales(
                        teamSalesPerson[i],
                        sales,
                        new Date(`01/01/${new Date().getFullYear() - 1}`),
                        new Date(`12/31/${new Date().getFullYear() - 1}`) 
                    )
                teamSales.push(memberSales)
            }

            console.info(teamSales)

            for(let i = 0; i < teamSalesPerson.length; i++){
                const today = new Date()
                const memberSales = getSales(
                        teamSalesPerson[i],
                        sales,
                        new Date(today.getFullYear(), today.getMonth(), 1),
                        today 
                    )
                teamSales.push(memberSales)
            }

            console.info(teamSales)





            

            

            


            // setYTDSale( 
            //     // sales.filter(s => 
            //     // s.soldBy === employeeId 
            //     // && new Date(s.purchaseDate) >= new Date(`01/01/${new Date().getFullYear()}`)
            //     // && new Date(s.purchaseDate) <= new Date()

            // ));

            // const today = new Date()
            // setMTDSale(sales.filter(s =>
            //     s.soldBy === employeeId 
            //     && new Date(s.purchaseDate) >= new Date(today.getFullYear(), today.getMonth(), 1)
            //     && new Date(s.purchaseDate) <= today
            // ))
        }
    },[sales, getSales, employeeId, employeeList, getEmployees])



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

            
        </Grid>
    )
}

const Color = () => {
    const r = () => Math.random() * 256 >> 0;
    return `${r()}, ${r()}, ${r()}`;
}

function MTD_Commission(performance){
    const today = new Date()
    const color = Color();

    let sales = 0;
    if(performance){
        for(let i = 0; i < performance.length; i++){
            sales += performance[i].purchasePrice * 0.03
        }
    }
    
    const month = today.toLocaleString('default', { month: 'short' });
    
    let data = {
        labels: [month],
        datasets: [
            {
                label: `MTD Commission (${month})`,
                data: [sales],
                backgroundColor: [`rgba(${color}, 0.2)`],
                borderColor: [`rgb(${color})`],
                borderWidth: 1
            }
        ]
    }
    return data
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
            const perf = performance[i];
            let color = Color()
            data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
            data.datasets[0].borderColor.push(`rgb(${color})`)
            const month = new Date(perf.purchaseDate).getMonth();
            data.datasets[0].data[month] += perf.purchasePrice;
        }
        data.datasets[0].label = `YTD Sale (${new Date(performance[0].purchaseDate).getFullYear()})`
    }
    return data;
}

function YTD_Commission(performance){
    let data = {
        labels: ["Jan", "Fed", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "YTD Commission",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            },
        ]
    }
    if(performance) {
        for (let i = 0; i < performance.length; i++){
            const perf = performance[i];
            let color = Color()
            data.datasets[0].backgroundColor.push(`rgba(${color}, 0.2)`)
            data.datasets[0].borderColor.push(`rgb(${color})`)
            const month = new Date(perf.purchaseDate).getMonth();
            data.datasets[0].data[month] += perf.purchasePrice * 0.03;
        }
        data.datasets[0].label = `YTD Commission (${new Date(performance[0].purchaseDate).getFullYear()})`
    }
    return data;
}

function MTD_Sales(performance){
    const today = new Date()
    const color = Color();

    let sales = 0;
    if(performance){
        for(let i = 0; i < performance.length; i++){
            sales += performance[i].purchasePrice
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
export default ManagerPerformance