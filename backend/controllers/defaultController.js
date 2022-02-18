const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Gender = require('../models/genderModel')
const Country = require ('../models/countryModel')
const State = require ('../models/stateModel')
//const ZipCode = require ('../models/ZipCode')
const Bank = require ('../models/bankModel')
const DayOff = require('../models/dayOffModel')
const Department = require('../models/departmentModel')
const Position = require('../models/positionModel')
const Manufacturer = require('../models/manufacturerModel')
const Model = require('../models/carModel')

// @route       GET api/defaults
// @desc        Get list of all default objects
// @access      private
const getAll = async (req, res) => {
    try {
        console.log("grabbing defaults")
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

        // const zipcodes = await ZipCode.find()
        //     .select('-createdAt').select('-updatedAt')
        //     .select('-__v').select('-lastModified')
        //     .sort({ name: 1 });
        
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
        }
        res.json(data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}




module.exports ={ getAll}