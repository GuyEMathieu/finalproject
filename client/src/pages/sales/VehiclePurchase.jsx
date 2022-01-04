import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {
    Paper, TextField, Grid
} from '@mui/material'
//#region CONTEXT
import { InventoryContext } from '../../context/inventoryContext/InventoryState';
//#region COMPONENTS

import VehiclePurchaseStepper from './VehiclePurchaseStepper';
import MainContainer from '../../components/MainContainer';
//#endregion

const VehiclePurchase = () => {
    const {id} = useParams();
    const inventoryContext = useContext(InventoryContext);
    const {inventoryVehicles, getVehicles} = inventoryContext;

    const [purchase, setPurchase] = useState({
        vehicle: {},
        customer: {address: {}}
    })
    useEffect(() => {
        if(inventoryVehicles === null){
            getVehicles()
        }

        if(inventoryVehicles && id){
            setPurchase({
                ...purchase, 
                vehicle: inventoryVehicles.find(v => v._id === id)
            })
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inventoryVehicles, id, getVehicles])

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Vehicle Info', 'Customer Info', 'Customer Address'];
    const handleNext = () => {
        if(activeStep < steps.length - 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handlePrev = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    

    function DisplaySteps(){
        switch(activeStep){
            case 0:
                return 'vehicle info'
            case 1:
                return 'Customer info'
            case 2:
                return 'Customer Address'
            default:
                return null
        }
    }
    return (
        <MainContainer>
            <VehiclePurchaseStepper 
                steps={steps}
                handleNext={handleNext} 
                handlePrev={handlePrev} 
                activeStep={activeStep}>
                
                <Paper>
                    {DisplaySteps()}
                </Paper>

            </VehiclePurchaseStepper>
        </MainContainer>
    )
}

export default VehiclePurchase
