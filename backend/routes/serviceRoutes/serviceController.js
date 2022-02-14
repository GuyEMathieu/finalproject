const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Service = require('./Service')
const auth = require('../auth');

const Employee = require('../employeeRoutes/Employee')


// @route       POST api/service
// @desc        GET ALL SERVICEs
// @access      private
router.get('/', async (req, res) => {
    try {
        const sales = await Service.find()
            

        res.json(sales);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/service/multiple
// @desc        GET ALL SERVICEs
// @access      private
router.post('/multiple', async (req, res) => {
    try {

        const repairEmployees = await Employee.find({$and: [
            {team: "Tech_One"}, 
            {"employmentInfo.position": {$ne: "61ef86f07177568a49026616"}}
        ]})

        let services = [];

        req.body.forEach(element => {
            const _service = {
                ...element, 
                employee: repairEmployees[Math.floor(Math.random() * repairEmployees.length - 0)]._id
            }
            services.push(_service)
        });


        services = await Service.insertMany(services)

        res.json(services);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;