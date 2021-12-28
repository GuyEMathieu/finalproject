const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const Country = require('./Country');
const State = require('./State')
const auth = require('../userAuthRoutes/auth')
const { v4: uid } = require('uuid');



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
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/states
// @desc        Get State list
// @access      private
router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id;
        await State.findByIdAndDelete(id)

        const states = await State.find()
            .select('-__v').select('-lastModified')

        res.json(states)
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


// @route       POST api/states
// @desc        Add single State
// @access      private
router.post('/', 
    [
        check("name", "A State name is required").not().isEmpty(),
        check("code", "A State code is required").not().isEmpty(),
        check("country", "A State country is required").not().isEmpty(),
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
            let state = await State.findOne({name: req.body.name, code: req.body.code, country: req.body.country});

            if(state){
                return res.status(501).json({errors: [{severity: "Error", msg: "State alreay exists", _id: uid()}]})
            }

            state = new State(req.body);
            await state.save();

            res.json(state);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


// @route       POST api/states/multiple
// @desc        add multiple State to db
// @access      private
router.post('/multiple', async (req, res) => {

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
        await State.findByIdAndDelete(id);
        
        const states = await State.find()
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(states);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router;