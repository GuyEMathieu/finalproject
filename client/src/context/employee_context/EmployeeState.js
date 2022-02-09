import { createContext } from 'react';

import React, {useReducer} from 'react';
import employeeReducer from './employeeReducer';
import axios from 'axios'

import * as ActionTypes from './employeeContextTypes'

import {SALES_PERFORMANCE} from '../shared/salesPerformance'
import { prettyAlert } from '../../utils/Formatter';


export const EmployeeContext = createContext();

const EmployeeState = props => {
    const initialState = {
        employeeList: null,
        salesPerformance: SALES_PERFORMANCE,
        currentEmployee: null,
        alerts: null,
    }

    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    const [state, dispatch] = useReducer(employeeReducer, initialState);

    const getEmployees = async () => {

        try {
            const res = await axios.get('/api/employees')
            dispatch({
                type: ActionTypes.GET_ALL,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const getProfile = async id => {
        try {
            const res = await axios.get(`/api/employees/${id}`)
            dispatch({
                type: ActionTypes.SET_CURRENT_EMPLOYEE,
                payload: res.data
            })

        } catch(err) {
            console.info(err)
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const addEmployee = async employee => {
        try {
            const res = await axios.post('/api/employees', employee, config)
            console.info("")
            dispatch({
                type: ActionTypes.ADD_EMPLOYEE,
                payload: res.data
            })
        } catch (err) {
            console.info(err.response.data)
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.alerts
            })
        }
    }

    const setCurrentEmployee = async employee => {
        dispatch({
            type: ActionTypes.SET_CURRENT_EMPLOYEE,
            payload: employee
        })
    }

    const searchEmployee = async employee => {
        const config =  {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            console.info("Searching for ", employee)
            const res = await axios.post(`/api/employees/search`, employee, config);
            prettyAlert("Search Result: ", res.data)
            
            // dispatch({
            //     type: SEARCH,
            //     payload: res.data
            // })
        } catch (err) {
            console.info("error", err)
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const updateEmployee = async (changes) => {
        

        try {
            prettyAlert(changes)
            const res = await axios.put(`/api/employees/${changes._id}`, changes, config)
            prettyAlert(res.data)
            
            dispatch({
                type: ActionTypes.UPDATE_EMPLOYEE,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: ActionTypes.SET_ALERTS,
                payload: err.response.data.errors
            })
        }
        dispatch({
            type: ActionTypes.UPDATE_EMPLOYEE,
            payload: changes
        })
    }

    const removeAlert = async id => {
        dispatch({
            type: ActionTypes.REMOVE_ALERT,
            payload: id
        })
    }

    return (
        <EmployeeContext.Provider
            value= {{
                employeeList: state.employeeList,
                currentEmployee: state.currentEmployee,
                alerts: state.alerts,
                quickView: state.quickView,
                salesPerformance: state.salesPerformance,

                getProfile,
                setCurrentEmployee,
                getEmployees,
                addEmployee,
                searchEmployee,
                removeAlert,
                updateEmployee,
            }}>

            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeState;