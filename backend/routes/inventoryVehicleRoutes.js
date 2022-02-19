
const express = require('express');
const router = express.Router();
const { getInventory, getVehicleById, addNewVehicle } = require('../controllers/inventoryVehicleController')
const auth = require('../middleware/authMiddleware');

// @desc    login a new user
// @route   /api/inventoryVehicles
// @access  public
router.get('/',  getInventory)

// @desc    add new vehicle
// @route   /api/inventoryVehicles/
// @access  public
router.post('/',  addNewVehicle)

// @desc    get vehicle by id
// @route   /api/inventoryVehicles/:id
// @access  public
router.get('/:id',  getVehicleById)

module.exports = router;

