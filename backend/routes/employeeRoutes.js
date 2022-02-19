
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const { 
    getAllEmployees, addMultipleEmployees, 
    addEmployee, getEmployeeById, updateEmployee
} = require('../controllers/employeeController')

// @desc    login a new user
// @route   /api/inventoryVehicles
// @access  public
router.get('/',  getAllEmployees)

// @desc    add new vehicle
// @route   /api/inventoryVehicles/
// @access  public
router.post('/',  addEmployee)

// @desc    get vehicle by id
// @route   /api/inventoryVehicles/:id
// @access  public
router.get('/:id',  getEmployeeById)

router.put('/:id', updateEmployee)

router.post('/multiple', addMultipleEmployees)

module.exports = router;



