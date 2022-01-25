const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Manufacturer = require('./Manufacturer')

// @route       GET api/manufacturers
// @desc        Get list of all Manufacturer objects
// @access      private
router.get('/', async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        res.json(manufacturers);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/manufacturers
// @desc        Add a Single Manufacturer
// @access      private
router.post('/', 
    [
        check("name", "A valid Manufacturer name is required").not().isEmpty()
    ],async (req, res) => {
        
        try {
            let rawErrors = validationResult(req);
            let errors = []

            if (!rawErrors.isEmpty()) {
                rawErrors = rawErrors.array();
                for (let i = 0; i < rawErrors.length; i++) {
                    errors.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
                }
                return res.status(400).json(errors)
            }
            const {name} = req.body;

            let _manufacturer = await Manufacturer.findOne({name});

            if(_manufacturer){
                return res.status(409).json({severity: 'error', msg: `${name} already exists`, _id: uid()})
            }

            
            _manufacturer = new Manufacturer({name});
            await _manufacturer.save();
            
            res.json(_manufacturer);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/manufacturers
// @desc        Add a Single day Off
// @access      private
router.post('/multiple', async (req, res) => 
    {
        try {
            let _manufacturers = []
            for(let i = 0; i < req.body.length; i++){
                const {make} = req.body[i];
                console.log(make)

                let newManufacturer = await Manufacturer.findOne({name: make})
                if(!newManufacturer){
                    newManufacturer = new Manufacturer({name: make});
                    await newManufacturer.save();
                    console.log(`Manufacturer: ${newManufacturer}`)
                    _manufacturers.push(newManufacturer)
                }
            }
            
            res.json(_manufacturers);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


module.exports = router;