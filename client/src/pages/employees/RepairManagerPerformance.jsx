import React, {useState, useEffect, useContext} from 'react';
import {
    TableRow, TableHead, TableContainer,
    TableCell, TableBody, Table
} from '@mui/material'


import {ServiceContext} from '../../context/service_context/ServiceState';
import {useParams} from 'react-router-dom'
import BarChart from '../../components/charts/BarChart';
import { EmployeeContext } from '../../context/employee_context/EmployeeState';

//import DoughnutChart from '../../components/charts/PieChart';
import {
    Grid, Paper, FormControl,
    FormLabel, RadioGroup, 
    FormControlLabel, Radio, Typography
} from '@mui/material'

import Loading from '../../components/Loading'

import {
    Team_MTD_Repairs, Team_YTD_Repairs, Member_Prior_Repair
} from '../../utils/performanceUtils'
import TeamPerformanceTable from './TeamPerformanceTable';

const RepairManagerPerformance = () => {
    const {employeeId} = useParams();
    const employeeContext = useContext(EmployeeContext);
    const {employeeList, getEmployees} = employeeContext;

    const serviceContext = useContext(ServiceContext);
    const {services, getServices} = serviceContext;

    const [teamYTD, setTeamYTD] = useState(null);
    const [teamPriorYear, setTeamPriorYear] = useState(null);
    const [teamMTD, setTeamMTD] = useState(null);

    const [showPrior, setShowPrior] = useState('false')

    useEffect(() => {
        if(services === null){
            getServices();
        }

        if(employeeList === null){
            getEmployees();
        }
        const manager = employeeList.find(e => e._id === employeeId);

        const repairTeam = employeeList.filter(e => 
            e.employmentInfo.team === manager.employmentInfo.team 
            && e._id !== manager._id
        )

        if(repairTeam && services){
            function getPerformances (member, start, end){
                return {
                    name: `${member.firstName} ${member.lastName}`,
                    performance: services.filter(s => s.employee === member._id
                        && new Date(s.date) >= start
                        && new Date(s.date) <= end
                    )
                }
            }

            const today = new Date();
            let teamRepairs = []
            for (let i = 0; i < repairTeam.length; i++){
                const memberRepair = getPerformances(
                    repairTeam[i],
                    new Date(`01/01/${new Date().getFullYear()}`),
                    today
                )
                teamRepairs.push(memberRepair)
            }
            setTeamYTD(teamRepairs)

            teamRepairs = []
            for (let i = 0; i < repairTeam.length; i++){
                const memberRepair = getPerformances(
                    repairTeam[i],
                    new Date(today.getFullYear(), today.getMonth(),1),
                    today
                )
                teamRepairs.push(memberRepair)
            }
            setTeamMTD(teamRepairs)

            teamRepairs = []
            for (let i = 0; i < repairTeam.length; i++){
                const memberRepair = getPerformances(
                    repairTeam[i],
                    new Date(`01/01/${new Date().getFullYear() - 1}`),
                    new Date(`12/31/${new Date().getFullYear() - 1}`)
                )
                teamRepairs.push(memberRepair)
            }
            setTeamPriorYear(teamRepairs)
        }

    },[employeeList, getEmployees, services, getServices, employeeId])

    const handleChange = e => {
        setShowPrior(e.target.value)
    }

    const [selectedMember, setSelectedMember] = useState(null)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{p:0.5}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <FormLabel align='left'>Show</FormLabel>
                                <RadioGroup
                                    value={showPrior} row
                                    onChange={handleChange}>
                                    <FormControlLabel value={'false'} control={<Radio />} label={`Current Year (${new Date().getFullYear()})`} />
                                    <FormControlLabel value={'true'} control={<Radio />} label={`Last Year (${new Date().getFullYear() -1})`} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {showPrior === 'false'
                ?   <React.Fragment>
                        <Grid item xs={12} md={6}>
                            <Paper>
                                {teamYTD 
                                    ? <BarChart data={Team_YTD_Repairs(teamYTD)} />
                                    : <Loading  />
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper>
                                {teamMTD 
                                    ? <BarChart data={Team_MTD_Repairs(teamMTD)}  />
                                    : <Loading  />
                                }
                            </Paper>
                        </Grid>
                    </React.Fragment>
                :   <React.Fragment>
                        <Grid item xs={12} md={6}>
                            {teamPriorYear 
                                ? <TeamPerformanceTable members={teamPriorYear} setSelectedMember={setSelectedMember}/>
                                : <Loading  />
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper>
                                {teamPriorYear && selectedMember
                                    ?   <BarChart data={Member_Prior_Repair(selectedMember)} />
                                    :   <Loading  />
                                }
                            </Paper>
                        </Grid>
                    </React.Fragment>
            }
        </Grid>
    )
}




export default RepairManagerPerformance