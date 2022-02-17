const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Manufacturer = require('./Manufacturer')
const auth = require('../auth')

// @route       GET api/manufacturers
// @desc        Get list of all Manufacturer objects
// @access      private
router.get('/', auth, async (req, res) => {
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
router.post('/',[auth,  
    [
        check("name", "A valid Manufacturer name is required").not().isEmpty()
    ]],async (req, res) => {
        
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
router.post('/multiple', auth, async (req, res) => 
    {
        try {
            
            let makes = ["Audi", "Volvo", "Honda", "Acura", "Lexus", "Lincoln", "Cheverolet", "Mazda", "Mitsubishi", "Buick", "Toyota"];
            for(let i = 0; i < req.body.length; i++){
                const _make = req.body[i].make;
                if(!makes.includes(_make)){
                    makes.push(_make)
                }
            }

            makes.sort()
            let manufacturers = []
            for(let i = 0; i < makes.length; i++){

                manufacturers.push({name: makes[i]})
            }

            const data = await Manufacturer.insertMany(manufacturers)
            res.json({data, makes})

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


module.exports = router;