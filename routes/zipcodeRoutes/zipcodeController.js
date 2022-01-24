const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const ZipCode = require("./ZipCode")
const State = require('../stateRoutes/State')

// @route       GET api/zipcodes
// @desc        Get list of zipcodes
// @access      private
router.get('/', async (req, res) => {
    try {
        const zipcodes = await ZipCode.find()
            .select('-lastModified').select('-__v')
        
        res.json(zipcodes);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/zipcodes
// @desc        Get list of zipcodes
// @access      private
router.get('/:zip', async (req, res) => {
    try {
        const zip = req.params['zip']
        const zipcodes = await ZipCode.find({zip})
            .select('-lastModified').select('-__v')
        
        res.json(zipcodes);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/zipcodes
// @desc        POST list of zipcodes
// @access      private
router.post('/', async (req, res) => {
    try {
        const {state, zip, city} = req.body;
        const zipState = await State.findOne({code: state});

        const newZip = new ZipCode({
            zip, 
            state: zipState._id, 
            country: zipState.country,
            city: city
        })

        await newZip.save();
        
        res.json(newZip);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})





// @route       POST api/zipcodes/multiple
// @desc        add multiple zipcodes to db
// @access      private
router.post('/multiple', async (req, res) => {

    try {
        let zipcodes = []
        console.log(req.body.length)

        for(let i = 0; i < req.body.length; i++){
            const {state, zip, city} = req.body[i];
            if(state && zip && city){
                const zipState = await State.findOne({code: state});
                let _newZip = await ZipCode.findOne({zip, city});
                if(!_newZip){
                    console.log("Creating New zip")
                    _newZip = new ZipCode({
                        zip,
                        state: zipState._id,
                        country: zipState.country,
                        city
                    })
                    await _newZip.save();
                    zipcodes.push(_newZip)
                }

            }
        }

        

        res.json({received: req.body.length, created: zipcodes.length, zipcodes});
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
