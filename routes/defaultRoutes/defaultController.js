const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Gender = require('../genderRoutes/Gender')
const Country = require ('../countryRoutes/Country')
const State = require ('../stateRoutes/State')
const ZipCode = require ('../zipcodeRoutes/ZipCode')
const Bank = require ('../bankRoutes/Bank')
const DayOff = require('../daysoffRoutes/DayOff')
const Department = require('../departmentRoutes/Department')
const Position = require('../positionRoutes/Position')
const Manufacturer = require('../manufacturerRoutes/Manufacturer')
const Model = require('../modelRoutes/Model')



// @route       GET api/defaults
// @desc        Get list of all default objects
// @access      private
router.get('/', async (req, res) => {
    try {
        const positions = await Position.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });
        
        const models = await Model.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });
        
        const manufacturers = await Manufacturer.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });

        const departments = await Department.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });
        
        const zipcodes = await ZipCode.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });

        const dayOff = await DayOff.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });
        
            const genders = await Gender.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });

        const countries = await Country.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });

        const states = await State.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });

        const banks = await Bank.find()
            .select('-createdAt').select('-updatedAt')
            .select('-__v').select('-lastModified')
            .sort({ name: 1 });
        
        const data = {
            manufacturers,
            models,
            positions,
            departments,
            dayOff,
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