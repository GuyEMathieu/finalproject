const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Country = require('./Country');
const auth = require('../userAuthRoutes/authController');
const { v4: uid } = require('uuid');



// @route       GET api/countries
// @desc        Get country list
// @access      private
router.get('/', async (req, res) => {

    try {
        const countries = await Country.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(countries);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/countries
// @desc        Get country list
// @access      private
router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        await Country.findByIdAndDelete(id);
        
        const countries = await Country.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(countries);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


// @route       POST api/countries
// @desc        Add single country
// @access      private
router.post('/', [auth,
    [
        check("name", "A country name is required").not().isEmpty(),
        check("code", "A country code is required").not().isEmpty(),
    ]],
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

            let country = await Country.findOne({name, code});

            if(country){
                return res.status(501).json({errors: [{severity: "Error", msg: "Country already exists", _id: uid()}]})
            }

            country = new Country({name, code});
            await country.save();

            res.json(country);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


// @route       POST api/countries/multiple
// @desc        add multiple country to db
// @access      private
router.post('/multiple', async (req, res) => {
    const raw = req.body;
    let errors = []

    for (let i = 0; i < raw.length; i++){
        if (!raw[i].name || !raw[i].code) {
            errors.push({ severity: "error", msg: "A valid country name and/or Abbreviation is required", _id: uid() })
            break;
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({errors: errors})
    }
    
    try {

        let countries = []
        for (let i = 0; i < req.body.length; i++){
            const { name, code } = req.body[i];

            let _country = await Country.findOne({ name: name, code: code });

            console.info(name, " is found as country: ", _country)
            if (!_country) {
                countries.push({name, code})
            }
        }

        const result = await Country.insertMany(countries)

        res.json(result);
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router;

