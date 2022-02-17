const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const State = require('./State')
const Country = require("../countryRoutes/Country")
const auth = require('../auth')
// @route       GET api/states
// @desc        Get State list
// @access      private
router.get('/', auth, async (req, res) => {

    try {
        console.info("State Requests Received")
        const states = await State.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(states);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/states/multiple
// @desc        add multiple State to db
// @access      private
router.post('/multiple', auth, async (req, res) => {

    try {
        const country = await Country.findOne({code: "USA"})
        let _states = []

        for (let i = 0; i < req.body.length; i++){
            let state = await State.findOne({ code: req.body[i].code })
            
            const { name, code } = req.body[i]

            if (!state) {
                state = {
                    name, code, 
                    country: country._id
                };
                _states.push(state);
            }
        }

        let states = await State.insertMany(_states);
        //states.sort({name: 1})

        res.json(states);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;