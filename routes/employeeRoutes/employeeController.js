const express = require('express');
const {check,  validationResult } = require('express-validator');
const router = express.Router();
const User = require('../userAuthRoutes/User')
const auth = require('../userAuthRoutes/auth')
const Gender = require('../genderRoutes/Gender')
const Employee = require('./Employee')
const Department = require('../dept_positionRoutes/Department')
const Position = require('../dept_positionRoutes/Position')
const State = require('../state_countryRoutes/State')
const Country = require('../state_countryRoutes/Country')
const EmploymentInfo = require('./EmploymentInfo')
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const { v4: uid } = require('uuid');
const EmployeeAddress = require('./EmployeeAddress');
const EmployeeRelation = require('./EmployeeRelation');
const EmergencyContact = require('./EmergencyContact');
const DriverLicense = require('./DriverLicense');

//@route        GET /api/employees
//@desc         Get Employee List
//@access       Private
router.get('/',  async (req, res) => {
    try {
        const employees = await Employee.find()
            .select('-password')
            .select('-__v')
            .select('-dateCreated')
            .select('-lastModified')

        res.json(employees)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route        GET /api/employees:id
//@desc         Get Employee profile
//@access       Private
router.get('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const employee = await Employee.findById(id).select('-__v').select('-lastModified').select('-user')
        const employeeAddress = await EmployeeAddress.findOne({employee: employee._id}).select('-__v').select('-lastModified')
        const employmentInfo = await EmploymentInfo.findOne({employee: employee._id}).select('-__v').select('-lastModified')
        const driverLicense = await DriverLicense.findOne({employee: employee._id}).select('-__v').select('-lastModified')
        const emergencyContact = await EmergencyContact.findOne({employee: employee._id}).select('-__v').select('-lastModified')
        
        const data = {
            personalInfo: employee, 
            employmentInfo : employmentInfo,
            address: employeeAddress,
            driverLicense: driverLicense,
            emergencyContact: emergencyContact
        }
        res.json(data)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route        GET /api/employees:id
//@desc         Get Employee profile
//@access       Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        let employee = await Employee.findById(id)

        if(employee){
            const userId = employee.user

            // Delete employee
            await Employee.deleteOne({_id: id})

            // Delete Emergency Contact
            //await EmergencyContact.deleteOne({employee: id})

            // Delete employmentInfo
            await EmploymentInfo.deleteOne({employee: employee._id})
    
            // Delete employeeAddress
            await EmployeeAddress.deleteOne({employee: employee._id})

            await User.deleteOne({_id: userId})

            return res.status(200).json({alerts: [{severity: 'Success', msg: "Employee Deleted", _id: uid()}]})
        }

        return res.status(200).json({alerts: [{severity: 'error', msg: "Employee not found", _id: uid()}]})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//@route        GET /api/employees:id
//@desc         Get Employee profile
//@access       Private
router.patch('/:id', auth, async (req, res) => {
    try {
        console.info("data sent", req.body)

        const _id = req.params.id

        let {personalInfo, address, driverLicense, emergencyContact, employmentInfo} = req.body;

        const filter = {employee: _id}
        const options = {new: true}

        if(personalInfo){
            let personalFields = {}
            
            if(personalInfo.firstName) personalFields.firstName = personalInfo.firstName
            if(personalInfo.middleName) personalFields.middleName = personalInfo.middleName
            if(personalInfo.lastName) personalFields.lastName = personalInfo.lastName
            if(personalInfo.dateOfBirth) personalFields.dateOfBirth = personalInfo.dateOfBirth
            if(personalInfo.ssn) personalFields.ssn = personalInfo.ssn
            if(personalInfo.gender) personalFields.gender = personalInfo.gender
            if(personalInfo.phone) personalFields.phone = personalInfo.phone
            if(personalInfo.email) personalFields.email = personalInfo.email

            personalInfo = await Employee.findOneAndUpdate({_id: _id}, {$set: personalFields}, options).select('-__v').select('-lastModified')   
        }else {
            personalInfo = await Employee.findOne({_id}).select('-__v').select('-lastModified')
        }

        if(address){
            const {street, city, aptNum, state, country, zipcode} = address;
            let addressFields = {}
            if(street) addressFields.street = street
            if(aptNum) addressFields.aptNum = aptNum
            if(city) addressFields.city = city
            if(state) addressFields.state = state
            if(country) addressFields.country = country
            if(zipcode) addressFields.zipcode = zipcode

            address = await EmployeeAddress.findOneAndUpdate({employee: _id}, {$set: addressFields}, options).select('-__v').select('-lastModified')  
        }else {
            address = await EmployeeAddress.findOne({employee: _id}).select('-__v').select('-lastModified')
        }

        if(driverLicense){
            const {dlState, dlNumber} = driverLicense
            let driverFields = {}

            if(dlState) driverFields.dlState = dlState;
            if(dlNumber) driverFields.dlNumber = dlNumber

            driverLicense = await DriverLicense.findOneAndUpdate({employee: _id}, {$set: driverFields}, options).select('-__v').select('-lastModified') 
        }else {
            driverLicense = await DriverLicense.findOne({employee: _id}).select('-__v').select('-lastModified')
        }

        if(emergencyContact){
            const {firstName, lastName, phone, relationship} = emergencyContact
            let emergencyFields = {}
            if(firstName) emergencyFields.firstName = firstName
            if(lastName) emergencyFields.lastName = lastName
            if(phone) emergencyFields.phone = phone
            if(relationship) emergencyFields.relationship = relationship
            
            emergencyContact = await EmergencyContact.findOneAndUpdate({employee: _id}, {$set: emergencyFields}, options).select('-__v').select('-lastModified')   
        }else {
            emergencyContact = await EmployeeAddress.findOne({employee: _id}).select('-__v').select('-lastModified')
        }

        if(employmentInfo){
            let employmentInfoFields = {}
            if(employmentInfo.daysOff) employmentInfoFields.daysOff = employmentInfo.daysOff
            if(employmentInfo.department) employmentInfoFields.department = employmentInfo.department
            if(employmentInfo.position) employmentInfoFields.position = employmentInfo.position
            if(employmentInfo.salary) employmentInfoFields.salary = employmentInfo.salary
            if(employmentInfo.employmentStatus) employmentInfoFields.employmentStatus = employmentInfo.employmentStatus

            employmentInfo = await EmploymentInfo.findOneAndUpdate({employee: _id}, {$set: employmentInfoFields}, options).select('-__v').select('-lastModified')    
        }else {
            employmentInfo = await EmploymentInfo.findOne({employee: _id}).select('-__v').select('-lastModified')
        }
        


        let data = {  personalInfo, address, driverLicense, emergencyContact, employmentInfo }
        data.personalInfo = personalInfo;
        //console.info("returning",  data)

        res.json(data)
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//@route        GET /api/employees:id
//@desc         Get Employee profile
//@access       Private
router.delete('/', auth, async (req, res) => {
    try {
        const id = req.params.id
        let employee = await Employee.findById(id)
        const all = await User.find()
        const users = all.filter(u => u.username !== 'Admin')

        if(users.length > 0){
            for(let i = 0; i < users.length; i++) {
                const userId = users[i]._id;

                // Delete employee
                const employee = await Employee.findOne({user: userId})
                
                await Employee.deleteOne({_id: employee._id})

                // Delete Emergency Contact
                await EmergencyContact.deleteOne({employee: employee._id})

                // Delete employmentInfo
                await EmploymentInfo.deleteOne({employee: employee._id})
        
                // Delete employeeAddress
                await EmployeeAddress.deleteOne({employee: employee._id})

                // Delete Emergency Contact
                await EmergencyContact.deleteOne({employee: employee._id})

                // Delete Driver License Contact
                await DriverLicense.deleteOne({employee: employee._id})

                await User.deleteOne({_id: userId})
            }

            return res.status(200).json({alerts: [{severity: 'Success', msg: "Employees Deleted", _id: uid()}]})
        }

        return res.status(200).json({alerts: [{severity: 'error', msg: "Employee not found", _id: uid()}]})
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})



//@route        GET /api/employees
//@desc         Get Employee List
//@access       Private
router.post('/', [auth, 
    [
        check('firstName', "A Valid first name is required").not().isEmpty(),
        check('lastName', "A Valid last name is required").not().isEmpty(),
        check('dateOfBirth', "A Valid Date of birth is required").not().isEmpty(),
        check('ssn', "A Valid SSN is required").not().isEmpty(),
        check('department', "A Valid Department is required").not().isEmpty(),
        check('position', "A Valid Position is required").not().isEmpty(),
    ]], 
    async (req, res) => {
        let rawErrors = validationResult(req);
        let alerts = []

        if (!rawErrors.isEmpty()) {
            rawErrors = rawErrors.array();
            for (let i = 0; i < rawErrors.length; i++) {
                alerts.push({severity: 'error', msg: rawErrors[i].msg, _id: uid()})
            }
            return res.status(400).json({alerts})
        }

        try {
            const {firstName, middleName, lastName, dateOfBirth, department, position, ssn} = req.body
            let employee = await Employee.findOne({firstName, lastName, dateOfBirth})

            if(employee) {
                return res.status(409).json({alerts: [{severity: 'error', msg: 'Duplicate. Employee Already exists!', _id: uid()}]})
            }

            const employeeNum = Math.floor(Math.random() * 5000) + 1
            const dateCreated = new Date()
            let user = new User({
                username: `${firstName}.${lastName}${employeeNum}`,
                password: `${lastName}${employeeNum}`,
                dateCreated,
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(user.password, salt)

            await user.save();

            employee = new Employee ({
                employeeNum: employeeNum,
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                ssn: ssn,
                dateOfBirth: dateOfBirth,
                user: user._id
            })

            await employee.save();

            res.json(employee)
            
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

//@route        POST /api/employees/multiple
//@desc         ADD Multiple Employees
//@access       Private
router.post('/multiple', auth, async (req, res) => {
    try {
        let employees = []
        
        for (let i = 0; i < req.body.length; i++) {
            const {
                firstName, middleName, lastName, dateOfBirth,
                email, gender, ssn, phone, user, driverLicense, emergencyContact,
                address, employmentInfo
            } = req.body[i]

            const {employeeNum} = employmentInfo

            let newUser = await User.findOne({ username: user.username });
            if (!newUser) {
                // Creating User
                const { username, password } = user;
                const dateCreated = new Date()
                let newUser = new User({ username, password, dateCreated })
                const salt = await bcrypt.genSalt(10)
                newUser.password = await bcrypt.hash(user.password, salt)
               await newUser.save();

                const _gender = await Gender.findOne({ name: gender })

                let personalInfo = new Employee({
                    firstName, lastName, middleName, dateOfBirth,
                    ssn, employeeNum,
                    user: newUser._id,
                    gender: _gender._id, email, phone
                })
                await personalInfo.save()

                const posDept = employmentInfo.position.split(' ')

                const department = await Department.findOne({name: posDept[0]})
                const position = await Position.findOne({name: employmentInfo.position})

                let newEmploymentInfo = new EmploymentInfo({
                    employeeNum,
                    salary: posDept[1] === 'Manager' ? 55000 : 35000,
                    employee: personalInfo._id,
                    department: department._id, 
                    position: position._id
                });
                await newEmploymentInfo.save()

                const {street, aptNum, city, state, country, zipcode} = address;
                let _state = await State.findOne({code: state})
                const _country = await Country.findOne({code: country})

                let employeeAddress = new EmployeeAddress({
                    employee: personalInfo._id,
                    street, aptNum, city, zipcode, 
                    employee: personalInfo._id,
                    state: _state._id, 
                    country:_country._id
                })

                await employeeAddress.save()

                const relations = await EmployeeRelation.find()
                const randRelation = relations[Math.floor(Math.random() * relations.length)]

                let employeeContactRelation = new EmergencyContact({
                    employee: personalInfo._id,
                    firstName: emergencyContact.firstName,
                    lastName: emergencyContact.lastName,
                    phone: emergencyContact.phone,
                    relationship: randRelation._id
                })

                await employeeContactRelation.save()

                _state = await State.findOne({code: driverLicense.dlState})
                let dl = new DriverLicense({
                    employee: personalInfo._id,
                    dlNumber: driverLicense.dlNum,
                    dlState: _state._id
                })

                await dl.save();

                let employeeData = {}
                employeeData.user = {username: newUser.username}
                employeeData.personalInfo = personalInfo
                employeeData.employmentInfo = newEmploymentInfo
                employeeData.address = employeeAddress
                employeeData.driverLicense = driverLicense
                employeeData.emergencyContact = employeeContactRelation
                employeeData.driverLicense = dl

                employees.push(employeeData)
            }
        }

        res.json(employees)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
module.exports = router;