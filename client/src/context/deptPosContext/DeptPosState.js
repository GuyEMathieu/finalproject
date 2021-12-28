import React, {useReducer, createContext} from 'react'
import { v4 as uid } from 'uuid';
import deptPosReducer from './deptPosReducer';
import axios from 'axios';

import {
    GET_ALL,
    ADD_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, SET_CURRENT_DEPARTMENT,
    ADD_POSITION, DELETE_POSITION, UPDATE_POSITION, SET_CURRENT_POSITION, 
    SET_ALERT, CLEAR_ALERTS, REMOVE_ALERT
} from './deptPosTypes'

export const DeptPosContext = createContext()

const DeptPosState = props => {
    const initialState = {
        departments: null,
        positions: null,
        currentDepartment: null,
        currentPosition: null,
        alerts: null
    }

    const [state, dispatch] = useReducer(deptPosReducer, initialState);

    

    const getAll = async (timeout = 5000) => {
        try {
            const res = await axios.get('api/dept_positions')
            dispatch({
                type: GET_ALL,
                payload: res.data
            })
        } catch (err) {
            const alerts = err.response.data.alerts;
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })
            
            for(let i = 0; i < alerts.length; i++){
                setTimeout(() => dispatch({
                    type: REMOVE_ALERT,
                    payload: alerts[i]._id
                }), timeout)
            }
        }
    }

    // eslint-disable-next-line no-lone-blocks
    {/* ====== DEPARTMENT LOGICS */}
    // Add Dept
    const addDepartment = async (dept, timeout = 5000) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/dept_positions/departments', dept, config)
            console.info(res.data)
            dispatch({
                type: ADD_DEPARTMENT,
                payload: res.data
            })
        } catch(err) {
            const alerts = err.response.data.alerts;
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })
            
            for(let i = 0; i < alerts.length; i++){
                setTimeout(() => dispatch({
                    type: REMOVE_ALERT,
                    payload: alerts[i]._id
                }), timeout)
            }
        }
    }

    // Delete Dept
    const deleteDepartment = async (id, timeout = 5000) => {
        
        try {
            await axios.delete(`/api/dept_positions/departments/${id}`)

            const alert = {
                _id: uid(),
                msg: 'Department successfully deleted',
                severity: 'success'
            };
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: {_id: id, alerts: [alert]}
            })

            
        }catch(err) {
            
            const alerts = err.response.data.alerts;
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })

            for(let i = 0; i < alerts.length; i++){
                setTimeout(() => dispatch({
                    type: REMOVE_ALERT,
                    payload: alerts[i]._id
                }), timeout)
            }
        }
    }

    // Update Dept
    const updateDepartment = async (dept, timeout = 5000) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.patch(`api/dept_positions/departments/${dept._id}`, dept, config)

        try {
            console.info("Updated ")
            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: res.data
            })
        } catch(err) {
            const alerts = err.response.data;
            console.info("Alerts", err.response)
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })
        }
    }

    const setCurrentDepartment = async department => {
        dispatch({
            type: SET_CURRENT_DEPARTMENT,
            payload: department
        })
    }
    // eslint-disable-next-line no-lone-blocks
    {/* ====== Position LOGICS */}
    const setCurrentPosition = async position => {
        dispatch({
            type: SET_CURRENT_POSITION,
            payload: position
        })
    }

    // Add Dept
    const addPosition = async (position, timeout = 5000) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/dept_positions/positions', position, config)
            console.info(res.data)
            dispatch({
                type: ADD_POSITION,
                payload: res.data
            })
        } catch(err) {
            const alerts = err.response.data.alerts;
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })
            
            for(let i = 0; i < alerts.length; i++){
                setTimeout(() => dispatch({
                    type: REMOVE_ALERT,
                    payload: alerts[i]._id
                }), timeout)
            }
        }
    }

    // Delete Pos
    const deletePosition = async (id, timeout = 5000) => {
        
        try {
            await axios.delete(`/api/dept_positions/positions/${id}`)

            const alert = {
                _id: uid(),
                msg: 'Position successfully deleted',
                severity: 'success'
            };
            dispatch({
                type: DELETE_POSITION,
                payload: {_id: id, alerts: [alert]}
            })

            
        }catch(err) {
            
            const alerts = err.response.data.alerts;
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })

            for(let i = 0; i < alerts.length; i++){
                setTimeout(() => dispatch({
                    type: REMOVE_ALERT,
                    payload: alerts[i]._id
                }), timeout)
            }
        }
    }

    // Update Dept
    const updatePosition = async (dept, timeout = 5000) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.patch(`api/dept_positions/positions/${dept._id}`, dept, config)

        try {
            console.info("Updated ")
            dispatch({
                type: UPDATE_POSITION,
                payload: res.data
            })
        } catch(err) {
            const alerts = err.response.data;
            console.info("Alerts", err.response)
            dispatch({
                type: SET_ALERT,
                payload: alerts
            })
        }
    }


    // eslint-disable-next-line no-lone-blocks
    {/* ====== ALERT LOGICS */}
    const clearAlerts = async () => {
        dispatch({
            type: CLEAR_ALERTS
        })
    }
    const removeAlert = async id => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }

    const setAlert = async (_alerts, timeout = 5000) => {

        let alerts = []
        for(let i = 0; i < _alerts.length; i++){
            const _id = uid()
            const _alert = {severity: _alerts[i].severity, msg: _alerts[i].msg, _id}

            alerts.push(_alert)

            setTimeout(() => dispatch({
                type: REMOVE_ALERT,
                payload: _id
            }), timeout)
        }

        dispatch({
            type: SET_ALERT,
            payload: alerts
        })
    }

    

    return (
        <DeptPosContext.Provider
            value={{
                departments: state.departments,
                currentDepartment: state.currentDepartment,
                currentPosition: state.currentPosition,
                positions: state.positions,
                alerts: state.alerts,

                addDepartment,
                deleteDepartment,
                updateDepartment,
                setCurrentDepartment,

                addPosition,
                deletePosition,
                updatePosition,
                setCurrentPosition,

                getAll,
                clearAlerts,
                removeAlert,
                setAlert

            }}>
                {props.children}
        </DeptPosContext.Provider>
    )
}

export default DeptPosState;