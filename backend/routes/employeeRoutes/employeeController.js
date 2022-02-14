const express = require('express');
const router = express.Router();
const {check,  validationResult } = require('express-validator');
const { v4: uid } = require('uuid');
const Employee = require('./Employee')
const auth = require('../auth');
const User = require("../userRoutes/User")
const bcrypt = require('bcryptjs')
const State = require("../stateRoutes/State")
const Position = require("../positionRoutes/Position")


// @route       POST api/employees
// @desc        Add New Employee
// @access      private
router.get('/',  async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route       PUT api/employees
// @desc        Update Employee
// @access      private
router.put('/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId
        let employee = await Employee.findById(employeeId);
        
        if(!employee){
            return res.status(404).json({errors: [{severity: 'errors', msg:"Employee not found", _id: uid()}]})
        };

        const {
            firstName, middleName, lastName, dateOfBirth,
            ssn, email, phone, gender, driverLicense,
            address, employmentInfo
        } = req.body;

        if(firstName) employee.firstName = firstName;
        if(middleName) employee.middleName = middleName;
        if(lastName) employee.lastName = lastName;
        if(dateOfBirth) employee.dateOfBirth = dateOfBirth;
        if(ssn) employee.ssn = ssn;
        if(email) employee.email = email;
        if(phone) employee.phone = phone;
        if(gender) employee.gender = gender;

        if(driverLicense) {
            const {dlState, dlNumber} = driverLicense;
            if(dlState) employee.driverLicense.dlState = dlState;
            if(dlNumber) employee.driverLicense.dlNumber = dlNumber;
        }

        if(address) {
            const {street, aptNum, city, state, country, zipcode} = address;
            if(street) employee.address.street = street;
            if(aptNum) employee.address.aptNum = aptNum;
            if(city) employee.address.city = city;
            if(state) employee.address.state = state;
            if(country) employee.address.country = country;
            if(zipcode) employee.address.zipcode = zipcode;
        }

        if(employmentInfo){
            const {startDate, position, department, salary} = employmentInfo;
            if(startDate) employee.employmentInfo.startDate = startDate;
            if(position) employee.employmentInfo.position = position;
            if(department) employee.employmentInfo.department = department;
            if(salary) employee.employmentInfo.salary = salary;
        }

        await employee.save();

        res.json(employee)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
// @route       POST api/employees
// @desc        Add New Employee
// @access      private
router.get('/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId
        const employee = await Employee.findById(employeeId);
        res.json(employee)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/employees
// @desc        Add New Employee
// @access      private
router.post('/', [
        
        check('firstName', 'Employee first name is required').not().isEmpty(),
        check('lastName', 'Employee last name is required').not().isEmpty(),
        check('dateOfBirth', 'Employee date of birth is required').not().isEmpty(),
        
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
            const {
                firstName, lastName, middleName, dateOfBirth,
                ssn, email, phone, team, avatar, gender,
                driverLicense, address, employmentInfo, 
            } = req.body;

            let newEmployee = await Employee.findOne({firstName, lastName, ssn})

            if(newEmployee){
                return res.status(400).json({errors: [{severity: 'error', msg: 'Employee Exists', _id: uid()}]})
            }

            const salt = await bcrypt.genSalt(10);

            let user = await User.findOne({username: `${firstName}.${lastName}`});

            if(user){
                return res.status(400).json({errors: [{severity: 'error', msg: 'username already Exists', _id: uid()}]})
            }

            user = new User({
                username: `${firstName}.${lastName}`,
                password: 'password'
            })
            
            user.password = await bcrypt.hash(user.password, salt)
            await user.save();

            const state = await State.findOne({name:'Florida'})
            const position = await Position.findOne({name: employmentInfo.position})

            newEmployee = new Employee({
                user: user._id,
                firstName, lastName, middleName,
                dateOfBirth: new Date(dateOfBirth),
                email, phone, team, avatar, gender,
                address:{
                    ...address,
                    state: state._id,
                    country: state.country
                }, 
                driverLicense: {
                    ...driverLicense,
                    dlState: state._id
                },
                employmentInfo:{
                    salary: employmentInfo.salary,
                    position: position._id,
                    department: position.department,
                    employeeNumber: Math.floor(Math.random() * (5000 - 100 + 1) + 100), 
                    team: team
                }
            });

            await newEmployee.save();
            res.json(newEmployee)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
)

// @route       POST api/employees
// @desc        Add New Employee
// @access      private
router.post('/multiple', async (req, res) => {
    try {
        let employees = []
        for(let i = 0; i < req.body.length; i++){
            
            const {
                firstName, lastName, middleName, dateOfBirth,
                ssn, email, phone, team, avatar, gender,
                driverLicense, address, employmentInfo, 
            } = req.body[i];

            let newEmployee = await Employee.findOne({firstName, lastName, ssn})

            if(!newEmployee){
                let user = await User.findOne({username: `${firstName}.${lastName}`});

                if(!user){
                    user = new User({
                        username: `${firstName}.${lastName}`,
                        password: 'password'
                    })
                    
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt)
                    await user.save();

                    

                    newEmployee = new Employee({
                        user: user._id, ssn, 
                        firstName, lastName, middleName,
                        dateOfBirth: new Date(dateOfBirth),
                        email, phone, team, avatar, gender,
                        address, driverLicense, 
                        employmentInfo: {
                            position: null,
                            salary: employmentInfo.salary,
                            employeeNumber: Math.floor(Math.random() * (5000 - 100 + 1) + 100), 
                        }
                    });


                    await newEmployee.save();

                    employees.push(newEmployee)
                }
            }
        }

        res.json(employees)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;