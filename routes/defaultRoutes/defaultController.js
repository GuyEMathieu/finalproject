const express = require('express');
const router = express.Router();
const auth = require('../userAuthRoutes/auth');
const { v4: uid } = require('uuid');
const VehicleMake = require('../vehicleRoutes/VehicleMake')
const VehicleModel = require('../vehicleRoutes/VehicleModel')
const Position = require('../dept_positionRoutes/Position')
const Department = require('../dept_positionRoutes/Department')
const Gender = require('../genderRoutes/Gender');
const DayOff = require('./DayOff');
const Country = require('../state_countryRoutes/Country');
const State = require('../state_countryRoutes/State');
const EmployeeRelation = require('../employeeRoutes/EmployeeRelation');
const EmploymentStatus = require('../employeeRoutes/EmploymentStatus');
const { daysInWeek } = require('date-fns');


// @route       GET api/baseVehicle/
// @desc        Get  Manufacturer and Model lists
// @access      private
router.get('/', auth, async (req, res) => {
    try {
  
        const manufacturers = await VehicleMake.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const employmentStatus = await EmploymentStatus.find()
            .select('-__v').select('-lastModified')
            .sort({name: 1})
        
        const models = await VehicleModel.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })

        const genders = await Gender.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })
        
        const departments = await Department.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })

        const positions = await Position.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })

        const daysOff = await DayOff.find()
            .select('-__v').select('-lastModified')

        const countries = await Country.find()
            .select('-__v').select('-lastModified')
            .sort({ name: 1 })

        const states = await State.find()
            .select('-__v').select('-lastModified')

        const employeeRelations = await EmployeeRelation.find()
            .select('-__v').select('-lastModified')
            
        
        const data = {
            employmentStatus: employmentStatus,
            employeeRelations: employeeRelations,
            countries: countries,
            states: states,
            daysOff: daysOff,
            genders: genders,
            manufacturers: manufacturers,
            models: models,
            departments: departments,
            positions: positions,
            
            
        }
        
        res.json(data)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

//#region DayOff Region
// @route       Post api/defaults/dayoffs
// @desc        Add Multiple Days Off
// @access      private
router.post('/employmentstatuses/multiple', auth, async (req, res) => {
    try {
  
        let statuses = []
        for(let i = 0; i < req.body.length; i++){
            const name = req.body[i].name;

            console.info("Name", name)
            let status = await EmploymentStatus.findOne({name})

            if(!status) {
                status = new EmploymentStatus({name})
                await status.save()
                statuses.push(status)
            }
        }

        console.info(statuses)
        res.json(statuses)

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

//#region DayOff Region
// @route       Post api/defaults/dayoffs
// @desc        Add Multiple Days Off
// @access      private
router.post('/daysOff/multiple', auth, async (req, res) => {
    try {
  
        let days = []
        for(let i = 0; i < req.body.length; i++){
            const name = req.body[i].name;

            let dayOff = await DayOff.findOne({name})

            if(!dayOff) {
                dayOff = new DayOff({name})
                await dayOff.save()
                days.push(dayOff)
            }
        }
        
        res.json(days)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

//#region DayOff Region
// @route       Post api/defaults/dayoffs
// @desc        Add Multiple Days Off
// @access      private
router.post('/employeeRelations/multiple', auth, async (req, res) => {
    try {
  
        let relationList = []
        for(let i = 0; i < req.body.length; i++){
            let name = req.body[i].name;

            let _relation = await EmployeeRelation.findOne({name})

            if(!_relation) {
                _relation = new EmployeeRelation({name: req.body[i].name})
                await _relation.save()
                relationList.push(_relation)
            }
        }
        
        res.json(relationList)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})


//#endregion


module.exports = router