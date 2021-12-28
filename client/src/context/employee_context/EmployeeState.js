import { createContext } from 'react';

import React, {useReducer} from 'react';
import employeeReducer from './employeeReducer';
import axios from 'axios'

import {
    ADD_EMPLOYEE, UPDATE_EMPLOYEE, SET_CURRENT_EMPLOYEE,
    GET_ALL, SET_ALERTS, REMOVE_ALERT, 
} from './employeeContextTypes'


export const EmployeeContext = createContext();

const EmployeeState = props => {
    const initialState = {
        employeeList: null,
        currentEmployee: null,
        alerts: null,
    }

    const [state, dispatch] = useReducer(employeeReducer, initialState);

    const getEmployees = async () => {

        try {
            const res = await axios.get('/api/employees')
            dispatch({
                type: GET_ALL,
                payload: res.data
            })
        } catch (err) {
            console.info(err)
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const getProfile = async id => {
        try {
            const res = await axios.get(`/api/employees/${id}`)
            dispatch({
                type: SET_CURRENT_EMPLOYEE,
                payload: res.data
            })

        } catch(err) {
            console.info(err)
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const addEmployee = async employee => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('/api/employees', employee, config)
            console.info("")
            dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data
            })
        } catch (err) {
            console.info(err.response.data)
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.alerts
            })
        }
    }

    const setCurrentEmployee = async employee => {
        dispatch({
            type: SET_CURRENT_EMPLOYEE,
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
            console.info("Search Result: ", res.data)
            
            // dispatch({
            //     type: SEARCH,
            //     payload: res.data
            // })
        } catch (err) {
            console.info("error", err)
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }



    const updateEmployee = async (id, changes) => {
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }

        try {
            const res = await axios.patch(`/api/employees/${id}`, changes, config)
            
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: res.data
            })

        } catch (err) {
            dispatch({
                type: SET_ALERTS,
                payload: err.response.data.errors
            })
        }
    }

    const removeAlert = async id => {
        dispatch({
            type: REMOVE_ALERT,
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