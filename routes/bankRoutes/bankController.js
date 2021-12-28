const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const State = require('../state_countryRoutes/State');
const Country = require('../state_countryRoutes/Country')
const Bank = require('./Bank')
const auth = require('../userAuthRoutes/auth')


// @route       DELETE api/banks
// @desc        delete a bank by id
// @access      private
router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        await Bank.findByIdAndDelete(id);
        
        const banks = await Bank.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        res.json(banks);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/banks
// @desc        Get list of Banks
// @access      private
router.get('/', auth, async (req, res) => {
    try {
        const banks = await Bank.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        res.json(banks);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/banks
// @desc        POST Add list of Banks
// @access      private
router.post('/multiple', auth, async (req, res) => {
    try {

        let banks = []

    
        for (let i = 0; i < req.body.length; i++){
            let bank = await Bank.findOne({ name: req.body[i].name })
            
            if (!bank) {
                bank = req.body[i];
                const state = await State.findOne({ code: bank.address.state });
                const country = await Country.findOne({ code: 'USA' })

                bank.address.state = state._id
                bank.address.country = country._id

                banks.push(bank)
            }
        }

        const _banks = await Bank.insertMany(banks);
        
        res.json(_banks);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


// @route       POST api/banks
// @desc        POST ADD a single Banks
// @access      private
router.post('/', [auth, 
    [
        check('name', 'A Bank name is required').not().isEmpty()
    ]],
    async (req, res) => {
        try {
            const country = await Country.findOne({ code: req.body.address.country })
            const state = await State.findOne({ code: req.body.address.state })
            
            let bank = req.body;
            bank = new Bank(bank)
            bank.address.state = state._id
            bank.address.country = country._id
            console.info(bank)
            await bank.save();
            
            res.json(bank);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

module.exports = router