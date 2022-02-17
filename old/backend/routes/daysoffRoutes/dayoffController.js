const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const DayOff = require('./DayOff')

// @route       GET api/daysoff
// @desc        Get list of all dayoff objects
// @access      private
router.get('/', async (req, res) => {
    try {
        const daysOff = await DayOff.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        res.json(daysOff);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/daysoff
// @desc        Add a Single day Off
// @access      private
router.post('/', 
    [
        check("name", "A valid name is required").not().isEmpty()
    ],async (req, res) => {
        
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

            let dayOff = await DayOff.findOne({name});
            console.log(dayOff)

            if(dayOff){
                return res.status(409).json({severity: 'error', msg: `${name} already exists`, _id: uid()})
            }

            
            dayOff = new DayOff({name});
            await dayOff.save();
            
            res.json(dayOff);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/daysoff
// @desc        Add a Single day Off
// @access      private
router.post('/multiple', async (req, res) => 
    {
        try {
            let _daysOff = []
            for(let i = 0; i < req.body.length; i++){
                const {name} = req.body[i];

                let newDayOff = await DayOff.findOne({name})
                if(!newDayOff){
                    newDayOff = new DayOff({name});
                    _daysOff.push(newDayOff)
                }
            }
            const newList = await DayOff.insertMany(_daysOff)
            
            res.json(newList);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


module.exports = router;