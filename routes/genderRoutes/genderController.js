const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const Gender = require('./Gender')
const auth = require('../userAuthRoutes/auth');
const { modelNames } = require('mongoose');

// @route       GET api/genders/
// @desc        Get  Gender lists
// @access      private
router.get('/', auth, async (req, res) => {
    try {
  
        const genders = await Gender.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
          
        res.json(genders)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/genders/
// @desc        Get  Gender lists
// @access      private
router.post('/multiple', auth, async (req, res) => {
    try {
        let raw = [];
        for(let i = 0; i < req.body.length; i++){
            const {name, code} = req.body[i]
            const gender = await Gender.findOne({name});

            if(!gender && !raw.filter(g => g.name === name).length > 0){
               raw.push({name, code})
            }
        }

        const genders = await Gender.insertMany(raw);
  
        res.json(genders)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/genders/
// @desc        ADD  Gender lists
// @access      private
router.post('/', [auth,
    [
        check('name', 'A gender name is required').not().isEmpty(),
        check('code', 'A gender code is required').not().isEmpty(),
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

module.exports = router;