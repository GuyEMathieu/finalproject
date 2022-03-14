const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
    addCustomer,
    updateCustomer,
    getCustomerById,
    addMultipleCustomers,
    getCustomerList,
    addVehicle,
    updateCustomerVehicle,
    deleteVehicleService,
    addVehicleService
} = require('../controllers/customerController')

router.get('/', auth, getCustomerList)

router.get('/:id', auth, getCustomerById)

router.post('/', auth, addCustomer)

router.put('/:customerId/vehicle', auth, updateCustomerVehicle)

router.put('/:id', auth, updateCustomer)

router.post('/multiple', auth, addMultipleCustomers)

router.post('/:customerId/vehicle', auth, addVehicle)

router.post('/:customerId/vehicle/:vin/service', auth, addVehicleService)

router.delete('/:customerId/vehicle/:vin/service', auth, deleteVehicleService)



module.exports = router;