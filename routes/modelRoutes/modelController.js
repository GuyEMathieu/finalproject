const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Model = require('./Model')

// @route       GET api/models
// @desc        Get list of all Model objects
// @access      private
router.get('/', async (req, res) => {
    try {
        const models = await Model.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        res.json(models);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/models
// @desc        Add a Single Model
// @access      private
router.post('/', 
    [
        check("name", "A valid Model name is required").not().isEmpty(),
        check("manufacturer", "A valid manufacturer is required").not().isEmpty(),
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
            const {name, manufacturer} = req.body;

            let _model = await Model.findOne({name});

            if(_model){
                return res.status(409).json({severity: 'error', msg: `${name} already exists`, _id: uid()})
            }

            
            _model = new Model({name, manufacturer});
            await _model.save();
            
            res.json(_model);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/models
// @desc        Add a Single day Off
// @access      private
router.post('/multiple', async (req, res) => 
    {
        try {
            let _models = []
            for(let i = 0; i < req.body.length; i++){
                const {name, manufacturer} = req.body[i];

                let newModel = await Model.findOne({name})
                if(!newModel){
                    newModel = new Model({name, manufacturer});
                    await newModel.save();
                    _models.push(newModel)
                }
            }
            
            res.json(_models);

        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)


module.exports = router;