const express = require('express');
const { v4: uid } = require('uuid');
const Employee = require('../models/employeeModel')



// @route       POST api/employees
// @desc        Add New Employee
// @access      private
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       PUT api/employees
// @desc        Update Employee
// @access      private
const updateEmployee =  async (req, res) => {
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
}

// @route       POST api/employees
// @desc        Add New Employee
// @access      private
const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.employeeId
        const employee = await Employee.findById(employeeId);
        res.json(employee)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       POST api/employees
// @desc        Add New Employee
// @access      private
const addEmployee = async (req, res) => {

    try {
        const {
            firstName, lastName, middleName, dateOfBirth,
            ssn, email, phone, team, avatar, 
            driverLicense, address, employmentInfo, 
        } = req.body;

        let messages = []
        if (!firstName) messages.push({severity: 'error', msg: 'Employee First Name is required', _id: uid()})
        if (!lastName) messages.push({severity: 'error', msg: 'Employee Last Name is required', _id: uid()})
        if (!dateOfBirth) messages.push({severity: 'error', msg: 'Employee Date of Birth is required', _id: uid()})

        if(messages.length > 0){
            return res.status(400).json({messages})
        }

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
        const gender = await Gender.findOne({name: req.body.gender})

        newEmployee = new Employee({
            avatar: avatar,
            user: user._id,
            firstName, lastName, middleName,
            dateOfBirth: new Date(dateOfBirth),
            email, phone, team, avatar, 
            gender: gender._id,
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


// @route       POST api/employees
// @desc        Add New Employee
// @access      private
const addMultipleEmployees = async (req, res) => {
    try {
        let employees = []
        for(let i = 0; i < req.body.length; i++){
            
            const {
                firstName, lastName, middleName, dateOfBirth,
                ssn, email, phone, team, avatar, 
                driverLicense, address, employmentInfo, 
            } = req.body[i];

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
            const gender = await Gender.findOne({name: req.body[i].gender})

            newEmployee = new Employee({
                avatar: avatar,
                user: user._id,
                firstName, lastName, middleName,
                dateOfBirth: new Date(dateOfBirth),
                email, phone, team, avatar, 
                gender: gender._id,
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

            employees.push(newEmployee)
        }

        res.json(employees)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports ={ getAllEmployees, addMultipleEmployees, addEmployee, getEmployeeById, updateEmployee}