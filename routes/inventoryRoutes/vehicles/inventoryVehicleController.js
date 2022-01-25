const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Manufacturer = require('../../manufacturerRoutes/Manufacturer');
const Model = require('../../modelRoutes/Model');
const InventoryVehicle = require('./InventoryVehicle')

// @route       GET api/inventoryvehicles
// @desc        Get list
// @access      private
router.get('/', async (req, res) => {
    try{
        const inventoryVehicles = await InventoryVehicle.find()
            .select('-createdAt').select('-updatedAt').select('-__v')

        res.json(inventoryVehicles)
    } catch(err){
        console.log(err.msg)
        res.status(500).send('Server Error');
    }
})

// @route       POST api/inventoryvehicles
// @desc        Add a single vehicle
// @access      private
router.post('/',[
        check("year", "A valid vehicle year is required").not().isEmpty(),
        check("vin", "A valid vehicle VIN is required").not().isEmpty(),
        check("make", "A valid vehicle Manufactucturer is required").not().isEmpty(),
        check("model", "A valid vehicle Model is required").not().isEmpty(),
        check("price", "A valid vehicle price is required").not().isEmpty(),
    ],
    async (req, res) => {
        
        try{
            let rawErrors = validationResult(req);
            let errors = []

            if (!rawErrors.isEmpty()) {
                rawErrors = rawErrors.array();
                for (let i = 0; i < rawErrors.length; i++) {
                    errors.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
                }
                return res.status(400).json(errors)
            }
            
            const {vin, year, make, model, price, description, mileage, image} = req.body;
            let vehicle = await InventoryVehicle.findOne({vin})

            if(vehicle){
                return res.status.json({errors: [{severity: 'error', msg: `vehicle with ${vin} already exists`, _id: uid()}]});
            }

            const manufacturer = await Manufacturer.findOne({name: make});
            const vehicleModel = await Model.findOne({name: model});
            console.log(make, model)
            if(vehicleModel && manufacturer){
                vehicle = new InventoryVehicle({
                    year, vin, description, 
                    make: manufacturer._id, 
                    model: vehicleModel._id, 
                    image, price, mileage
                });
            }

        
            await vehicle.save();

            res.json(vehicle)
        } catch(err){
            console.log(err.msg)
            return res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/inventoryvehicles
// @desc        Add a single vehicle
// @access      private
router.post('/multiple',
    async (req, res) => {
        
        try{
            let _vehicles = []
            for(let i = 0; i < req.body.length; i++){
                const {vin, year, make, model, price, description, mileage, image} = req.body[i];
                let newVehicle = await InventoryVehicle.findOne({vin})

                if(!newVehicle){
                    const manufacturer = await Manufacturer.findOne({name: make});
                    const vehicleModel = await Model.findOne({name: model});
                    if(vehicleModel && manufacturer){
                        newVehicle = new InventoryVehicle({
                            year, vin, description, 
                            make: manufacturer._id, 
                            model: vehicleModel._id, 
                            image, price, mileage
                        });

                        _vehicles.push(newVehicle)
                    }
                }
            }
            const vehicles = await InventoryVehicle.insertMany(_vehicles)

            res.json(vehicles)
        } catch(err){
            console.log(err.msg)
            return res.status(500).send('Server Error');
        }
    }
)

module.exports = router;