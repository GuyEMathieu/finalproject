const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Country = require('./Country')

// @route       GET api/countries
// @desc        Get list of countries
// @access      private
router.get('/', async (req, res) => {
    try {
        const countries = await Country.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        res.json(countries);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})
// @route       GET api/countries/id
// @desc        Get country by id
// @access      private
router.get('/:id', async (req, res) => {
    try {
        const id = req.params['id'];
        const country = await Country.findById(id)
        .select('-lastModified').select('-__v')

        res.json(country)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/countries
// @desc        Add New country
// @access      private
router.post('/', 
    [
        check('name', 'A country name is required').not().isEmpty(),
        check('code', 'A country code is required').not().isEmpty(),
    ],
    async (req, res) => {
        let rawErrors = validationResult(req);
        let errors = []

        if (!rawErrors.isEmpty()) {
            rawErrors = rawErrors.array();
            for (let i = 0; i < rawErrors.length; i++) {
                errors.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
            }
            return res.status(400).json(errors)
        }

        try {
            
            const { name, code } = req.body;
            let newCountry = await Country.findOne({ name, code })
            
            if (newCountry) {
                return res.status(409).json({severity: 'error', msg: 'country already exists', _id: uid()})
            }


            newCountry = new Country({ name, code })
            await newCountry.save();
            
            res.json(newCountry)
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/countries/multiple
// @desc        Add Multiple countries
// @access      private
router.post('/multiple',
    async (req, res) => {

    try {
        
        let errors = []
        for(let i = 0; i < req.body.length; i++)
        {
            const {name, code} = req.body[i];
            if (!name || !code){
                errors.push({severity: 'error', msg: "country names and codes are required for each entry", _id: uid()});
                break
            } 
        }

        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        let _countries = []

        for (let i = 0; i < req.body.length; i++){
            const {name, code} = req.body[i];
            
            let country = await Country.findOne({ name, code })
            
            if (!country) {
                country = {
                    name, code, 
                    code: code
                };
                _countries.push(country);
            }
        }

        let countries = await Country.insertMany(_countries);

        res.json(countries);
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router;