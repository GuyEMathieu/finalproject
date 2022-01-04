import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom'
import {
    Paper, TextField, MenuItem
} from '@mui/material'
import {RoundToTwo} from '../../utils/Formatter';

//#region CONTEXT
import { InventoryContext } from '../../context/inventoryContext/InventoryState';
import {CustomerContext} from '../../context/customer_context/CustomerState';
import {DefaultContext} from '../../context/default_context/DefaultState';

//#region COMPONENTS

import VehiclePurchaseStepper from './VehiclePurchaseStepper';
import MainContainer from '../../components/MainContainer';
import PersonalInfo from '../../components/PersonalInfo';
import Address from '../../components/Address'
import FeesAndCredits from './FeesAndCredits';
import Financing from './Financing';
//#endregion

const VehiclePurchase = () => {
    const {id} = useParams();
    const inventoryContext = useContext(InventoryContext);
    const {inventoryVehicles, getVehicles} = inventoryContext;

    const customerContext = useContext(CustomerContext);
    const {customerList, getCustomers} = customerContext;

    const defaultContext = useContext(DefaultContext);
    const {defaults, getAll} = defaultContext;

    const [purchase, setPurchase] = useState({
        vehicle: {},
        customer: {address: {}}
    })
    useEffect(() => {
        if(inventoryVehicles === null){
            getVehicles()
        }

        if(inventoryVehicles && id){
            const dealerPercentage = 0.1
            const stateTax = 0.07;

            const vehicle = inventoryVehicles.find(v => v._id === id)
            const dealerFees = RoundToTwo(vehicle.price * dealerPercentage)

            const subtotal = RoundToTwo(vehicle.price + dealerFees);
            const taxes = RoundToTwo(subtotal * stateTax)
            const balance = RoundToTwo(subtotal + taxes)
            const grandTotal = balance
            setPurchase({
                ...purchase, 
                vehicle: vehicle,
                sale: {
                    vehiclePrice: vehicle.price,
                    dealerFees: dealerFees,
                    subtotal: subtotal,
                    taxes: taxes,
                    balance: balance,
                    grandTotal: grandTotal
                },
                constants: {
                    dealerPercentage: dealerPercentage,
                    stateTax: stateTax
                }
            })
        }

        if(!customerList){
            getCustomers()
        } else {
            setPurchase({
                ...purchase, 
                customer: customerList[0]
            })
        }

        if(!defaults) {
            getAll()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inventoryVehicles, id, getVehicles, customerList, getCustomers, defaults])

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Vehicle Info', 'Customer Info', 'Customer Address', 'Fees And Credits', "Financing", "Review"];
    const handleNext = () => {
        if(activeStep < steps.length - 1){
            if(steps[activeStep] === 'Fees And Credits' && purchase.sale.balance === 0){
                setActiveStep((prevActiveStep) => prevActiveStep + 2)
                return;
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handlePrev = () => {
        if(steps[activeStep] === 'Review') {
            setActiveStep((prevActiveStep) => prevActiveStep - 2);
            return
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlePurchaseChange = e => {
        let {name, value} = e.target;
        const personal = ['firstName', 'middleName', 'lastName', 'ssn', 'dateOfBirth', 'gender', 'phone', 'email']

        const address = ['street', 'aptNum', 'city', 'state', 'country', 'zipcode']

        const FeesAndCredits = ['downPayment']
        
        if(personal.includes(name)){
            setPurchase(prev => {
                return {
                    ...prev,
                    customer:{
                        ...prev.customer,
                        [name]: value
                    }
                }
            })
            console.info(value)
            return 
        }

        if(address.includes(name)){
            setPurchase(prev => {
                return {
                    ...prev,
                    customer: {
                        ...prev.customer,
                        address: {
                            ...prev.customer.address,
                            [name]: value
                        }
                    }
                }
            })
        }

        if(FeesAndCredits.includes(name)){
            const balance = RoundToTwo(purchase.sale.grandTotal - +value)

            if(+value <= purchase.sale.grandTotal){
                
                setPurchase(prev => {
                    return {
                        ...prev,
                        sale: {
                            ...prev.sale,
                            balance: balance,
                            [name]: value
                        }
                    }
                })
                
            } 
            else {
                alert("Down payment cannot be more than grand total")
            }
        }
    }

    function DisplaySteps(){

        switch(activeStep){
            case 0:
                return 'vehicle info'
            case 1:
                return (
                    <div >
                        <TextField 
                            sx={{pb: 2}}
                            fullWidth label='Customer List' value={''}
                            select onChange={e => setPurchase({...purchase, customer: customerList.find(c => c._id === e.target.value)})}
                        >
                            <MenuItem disabled>Select Customer</MenuItem>

                            {customerList && customerList.map(customer => (
                                <MenuItem key={customer._id} value={customer._id}>{customer.firstName} {customer.lastName}</MenuItem>
                            ))}
                        </TextField>

                        <PersonalInfo 
                            sx={{mx: 0}}
                            data={purchase.customer} isDisabled={false} handleChange={handlePurchaseChange} />
                    </div>
                )
            case 2:
                return <Address address={purchase.customer.address} defaults={defaults} 
                    handleChange={handlePurchaseChange}/>
            case 3:
                return <FeesAndCredits purchase={purchase} defaults={defaults} 
                    handleChange={handlePurchaseChange}/>
            case 4:
                return <Financing purchase={purchase} defaults={defaults} 
                    handleChange={handlePurchaseChange}/>
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
