const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Gender = require('./Gender')

// @route       GET api/genders
// @desc        Get list of GEnders
// @access      private
router.get('/', async (req, res) => {
    try {
        const genders = await Gender.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        res.json(genders);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/genders/id
// @desc        Get gender by id
// @access      private
router.get('/:id', async (req, res) => {
    try {
        const id = req.params['id'];
        const gender = await Gender.findById(id)
        .select('-lastModified').select('-__v')

        res.json(gender)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/genders
// @desc        Add New Gender
// @access      private
router.post('/', 
    [
        check('name', 'A gender name is required').not().isEmpty(),
        check('code', 'A gender code is required').not().isEmpty(),
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
            let gender = await Gender.findOne({ name, code })
            
            if (gender) {
                return res.status(409).json({severity: 'error', msg: 'Gender already exists', _id: uid()})
            }

            gender = new Gender({ name, code })
            await gender.save();
            
            res.json(gender)
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/genders/multiple
// @desc        Add Multiple Genders
// @access      private
router.post('/multiple',
    async (req, res) => {

    try {
        
        let errors = []
        for(let i = 0; i < req.body.length; i++)
        {
            const {name, code} = req.body[i];
            if (!name || !code){
                errors.push({severity: 'error', msg: "Gender names and codes are required for each entry", _id: uid()});
                break
            } 
        }

        if (errors.length > 0) {
            return res.status(400).json(errors)
        }

        let _genders = []

        for (let i = 0; i < req.body.length; i++){
            const {name, code} = req.body[i];
            
            let gender = await Gender.findOne({ name, code })
            
            if (!gender) {
                gender = {
                    name, code, 
                    code: code
                };
                _genders.push(gender);
            }
        }

        let genders = await Gender.insertMany(_genders);

        res.json(genders);
        
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router;