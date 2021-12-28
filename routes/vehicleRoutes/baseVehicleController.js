const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const VehicleMake = require('./VehicleMake')
const VehicleModel = require('./VehicleModel')
const auth = require('../userAuthRoutes/auth');
const { modelNames } = require('mongoose');

// @route       GET api/baseVehicle/
// @desc        Get  Manufacturer and Model lists
// @access      private
router.get('/', auth, async (req, res) => {
    try {
  
        const manufacturers = await VehicleMake.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const models = await VehicleModel.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })
        
        const data = {
            hey: 'hey',
            manufacturers: manufacturers,
            models: models
        }
        
        res.json(data)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

//#region MANUFACTURERS
// @route       GET api/baseVehicle/
// @desc        Get  Manufacturer lists
// @access      private
router.get('/manufacturers', auth, async (req, res) => {
    try {
  
        const manufacturers = await VehicleMake.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const models = await VehicleModel.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })
        
        const data = {
            hey: 'hey',
            manufacturers: manufacturers,
            models: models
        }
        
        res.json(data)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       ADD api/baseVehicle/manufacturer/
// @desc        Get  Manufacturer and Model lists
// @access      private
router.post('/manufacturers/multiple', auth, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: [{severity: 'error', msg: "A valid Manufacturer name is required", _id: uid()}] });
    }

    try {
        let raw = []
        console.info(req.body.length, " submitted")

        for (let i = 0; i < req.body.length; i++) {
        
            if (!raw.includes(req.body[i].make)) {
                raw.push(req.body[i].make)
            }
        }

        let makes = []
        for (let i = 0; i < raw.length; i++){
            let _make = await VehicleMake.findOne({ name: raw[i] })
            console.info("found ", raw[i],"?", _make)
            
            if (!_make) {
                makes.push({name: raw[i]})
            }
        }

       
        makes = await VehicleMake.insertMany(makes);

        res.json(makes)
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       ADD api/baseVehicle/manufacturer/
// @desc        ADD  Manufacturer 
// @access      private
router.post('/manufacturers',
    [
        check("name", "A Manufacturer name is required").not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: [{severity: 'error', msg: "A valid Manufacturer name is required", _id: uid()}] });
        }

        try {
            let manufacturer = await VehicleMake.findOne({ name: req.body.name });

            if (manufacturer) {
                return res.status(400).json({
                    errors: [
                        { severity: 'error', msg: `Manufacturer ${manufacturer.name} already exists`, _id: uid() }
                    ]
                });

            }
            
            manufacturer = new VehicleMake({ name: req.body.name })
            
            await manufacturer.save();

            console.info("manufacturer", manufacturer)
            const manufacturers = await VehicleMake.find()
                .select('-__v').select('-lastModified')
                .sort({name: 1})
        
            const models = await VehicleModel.find()
                .select('-__v').select('-lastModified')
                .sort({name: 1})
            
            res.json({manufacturers, models})
            
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)
// @route       DELETE api/baseVehicle/manufacturer/:id
// @desc        Get  Manufacturer and Model lists
// @access      private
router.delete('/manufacturer/:id', async (req, res) => {
    try {
  
        await VehicleMake.findByIdAndDelete(req.params.id)

        const manufacturers = await VehicleMake.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const models = await VehicleModel.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        res.json({manufacturers, models})
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


//#endregion

//#region MODELS

// @route       ADD api/baseVehicle/models/
// @desc        Get  Models lists
// @access      private
router.post('/models/multiple', auth, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: [{severity: 'error', msg: "A valid Manufacturer name is required", _id: uid()}] });
    }

    try {
        let raw = []

        let models = []
        for (let i = 0; i < req.body.length; i++) {
        
            const existings = await models.filter(m => m.name === req.body[i].model);

            if (existings.length === 0) {
                const make = await VehicleMake.findOne({ name: req.body[i].make });

                models.push({name: req.body[i].model, make: make._id})
            }
        }
       
        newModels = await VehicleModel.insertMany(models);

        res.json(newModels)
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       DELETE api/baseVehicle/model/:id
// @desc        Delete  model by id
// @access      private
router.delete('/model/:id', async (req, res) => {
    try {
  
        await VehicleModel.findByIdAndDelete(req.params.id)

        const manufacturers = await VehicleMake.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const models = await VehicleModel.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        res.json({manufacturers, models})
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       ADD api/baseVehicle/model/
// @desc        Add new Model
// @access      private
router.post('/model',
    [
        check("name", "A Model name is required").not().isEmpty(),
        check("make", "A Manufacturer name is required").not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            console.info(errors)

            const raw = errors.array();
            
            let _errors = []
            for (let i = 0; i < raw.length; i++) {
                _errors.push({severity: 'error', msg: raw[i].msg, _id: uid()})
            }
            return res.status(400).json({errors: _errors });
        }

        try {
            let model = await VehicleModel.findOne({ name: req.body.name });

            if (model) {
                return res.status(400).json({
                    errors: [
                        { severity: 'error', msg: `Model ${model.name} already exists`, _id: uid() }
                    ]
                });

            }

            console.log(req.body)
            
            model = new VehicleModel({ name: req.body.name, make: req.body.make })
            
            await model.save();

            const manufacturers = await VehicleMake.find()
                .select('-__v').select('-lastModified')
                .sort({name: 1})
        
            const models = await VehicleModel.find()
                .select('-__v').select('-lastModified')
                .sort({name: 1})
            
            res.json({manufacturers, models})
            
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

//#endregion


module.exports = router