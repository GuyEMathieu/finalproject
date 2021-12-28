const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Zipcode = require('./Zipcode');
const Country = require('./Country');
const State = require('./State');
const { v4: uid } = require('uuid');
const auth = require('../userAuthRoutes/auth')


// @route       GET api/zipcodes
// @desc        Get Zipcode list
// @access      private
router.get('/', auth, async (req, res) => {

    try {
        const zipcodes = await Zipcode.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(zipcodes);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/zipcodes
// @desc        Get Zipcode list
// @access      private
router.delete('/:id', auth, async (req, res) => {

    try {
        const id = req.params.id;
        await Zipcode.findByIdAndDelete(id)

        const zipcodes = await Zipcode.find()
            .select('-__v').select('-lastModified')

        res.json(zipcodes)
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/states/multiple
// @desc        add multiple State to db
// @access      private
router.post('/multiple', async (req, res) => {

    try {
        let zipcodes = []
        let States = []

        for(let i = 0; i < req.body.length; i++) {
            const {stateCode, city, zip, countryCode, county} = req.body[i];

            const state = await State.findOne({code: stateCode})
            const country = await Country.findOne({code: countryCode})

            const postal = zip.length === 4 ? `0${zip}`
                : zip.length === 3 ? `00${zip}`
                : zip
                
            let newZip = await Zipcode.findOne({ postal: postal, county: county, city: city })
            
            
            if (!newZip) {
                const state = await State.findOne({ code: stateCode })
                if (state) {
                    States.push(state)
                }
                
                newZip = new Zipcode({
                    city: city,
                    county: county,
                    postal: postal
                })

                zipcodes.push(newZip)
            } 
        }

        const result = await Zipcode.insertMany(zipcodes);

        const xx = {
            received: req.body.length,
            totalSaved: result.length,
            totalUnsaved: req.body.length - result.length,
            zipcodes: results
        }

        console.info(xx)

        res.json({
            received: req.body.length,
            totalSaved: result.length,
            totalUnsaved: req.body.length - result.length,
            result: result
        });
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


module.exports = router;