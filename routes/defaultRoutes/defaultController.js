const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Gender = require('../genderRoutes/Gender')
const Country = require ('../countryRoutes/Country')
const State = require ('../stateRoutes/State')
const ZipCode = require ('../zipcodeRoutes/ZipCode')
const Bank = require ('../bankRoutes/Bank')



// @route       GET api/defaults
// @desc        Get list of all default objects
// @access      private
router.get('/', async (req, res) => {
    try {
        const zipcodes = await ZipCode.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
            const genders = await Gender.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        const countries = await Country.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        const states = await State.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });

        const banks = await Bank.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        
        const data = {
            banks,
            states,
            genders,
            countries,
            
            zipcodes,
            
        }
        res.json(data);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})





//#endregion

module.exports = router