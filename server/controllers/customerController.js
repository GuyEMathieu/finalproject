const { v4: uid } = require('uuid');
const Customer = require('../models/customerModel')
const Gender = require('../models/genderModel')
const State = require('../models/stateModel')
const Country = require('../models/countryModel');
const Service = require("../models/serviceModel");
const Employee = require("../models/employeeModel")


//#region Customer Profile

// @route       GET api/customers
// @desc        Get list of customers
// @access      private
const getCustomerList = async (req, res) => {
    try {
        const customers = await Customer.find()
            .select('-lastModified').select('-__v')
            .sort({ name: 1 });
        res.json(customers);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       GET api/customers/id
// @desc        Get Customer by id
// @access      private
const getCustomerById = async (req, res) => {
    try {
        const id = req.params['id'];
        const customer = await Customer.findById(id)
        .select('-lastModified').select('-__v')

        res.json(customer)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       POST api/customers
// @desc        Add new Customer
// @access      private
const addCustomer = async (req, res) => {
    try {
        const { 
            firstName, lastName, dateOfBirth, 
            phone, email, ssn, driverLicense, 
            address, middleName, gender 
        } = req.body;

        let errors = []
        if(!firstName) errors.push({severity: 'error', msg: 'Customer First name is required', _id: uid()})
        if(!lastName) errors.push({severity: 'error', msg: 'Customer Last name is required', _id: uid()})
        if(!dateOfBirth) errors.push({severity: 'error', msg: 'Customer date of birth is required', _id: uid()})

        if(errors.length > 0){
            return res.status(400).json({message: errors})
        }
        
        let customer = await Customer.findOne({ firstName, lastName, dateOfBirth});
        
        if (customer) {
            return res.status(409).json({severity: 'error', msg: 'Customer already exists', _id: uid()})
        }

        customer = {
            firstName, lastName, dateOfBirth, gender
        };

        if(middleName) customer.middleName = middleName;
        if(phone) customer.middleName = phone;
        if(email) customer.middleName = email;
        if(ssn) customer.middleName = ssn;
        if(email) customer.middleName = email;

        if(driverLicense){
            customer.driverLicense = {};
            const {dlNumber, dlState} = driverLicense;

            if(dlNumber) customer.driverLicense.dlNumber = dlNumber;
            if(dlState) customer.driverLicense.dlState = dlState;
        }

        if(address) {
            customer.address = {};
            const {street, aptNum, city, state, country, zipcode} = address;
            if(street) customer.address.street = street;
            if(aptNum) customer.address.aptNum = aptNum;
            if(city) customer.address.city = city;
            if(state) customer.address.state = state;
            if(country) customer.address.country = country;
            if(zipcode) customer.address.zipcode = zipcode;
        }

        const newCustomer = new Customer(customer)
        await newCustomer.save();
        
        res.json(newCustomer)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       PUT api/customers
// @desc        Update Customer
// @access      private
const updateCustomer = async(req, res) => {
    try {
        
        const id = req.params.id;
        let customer =  {} //await Customer.findById(id);

        const {firstName, middleName, lastName, dateOfBirth, gender, ssn, phone, email, address} = req.body;
        
        if(firstName) customer.firstName = firstName;
        if(middleName) customer.middleName = middleName;
        if(lastName) customer.lastName = lastName;
        if(dateOfBirth) customer.dateOfBirth = dateOfBirth;
        if(gender) customer.gender = gender;
        if(ssn) customer.ssn = ssn;
        if(phone) customer.phone = phone;
        if(email) customer.email = email;

        if(address){
            const {street, aptNum, city, state, country, zipcode} = address;

            if(street) customer.address.street = street
            if(aptNum) customer.address.aptNum = aptNum
            if(city) customer.address.city = city
            if(state) customer.address.state = state
            if(country) customer.address.country = country
            if(zipcode) customer.address.zipcode = zipcode
        }

        const updatedCustomer = await Customer.findOneAndUpdate(
            {_id: id}, 
            {$set: customer},
            {new: true}
        )
                
        res.json(updatedCustomer)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// @route       POST api/customers/multiple
// @desc        Add Multiple customers
// @access      private
const addMultipleCustomers = async (req, res) => {

    try {
        let customers = []
        for(let i = 0; i < req.body.length; i++){
            const {
                firstName, lastName, dateOfBirth, 
                phone, email, ssn, driverLicense, 
                address, middleName, gender
            } = req.body[i]

            const foundCountry = await Country.findOne({code: "USA"});

            let foundGender = await Gender.findOne({name: gender});
            if(!foundGender){
                foundGender = new Gender({
                    code: gender,
                    name: gender === 'F' ? "Female" : "Male"
                })
            }

            let newCustomer = {
                firstName, lastName, phone,
                email, ssn, dateOfBirth
            }
            if(middleName) newCustomer.middleName = middleName;

            newCustomer.gender = foundGender._id;
            
            if(driverLicense) {
                newCustomer.driverLicense = {}
                const {dlNumber, dlState} = driverLicense;
                let foundState = await State.findOne({code: dlState});                
                if(dlNumber) newCustomer.driverLicense.dlNumber = dlNumber
                if(dlState) newCustomer.driverLicense.dlState = foundState._id
            }

            if(address){
                newCustomer.address = {};
                const {street, aptNum, city, state, country, zipcode} = address
                const addressState = await State.findOne({code: state});

                if(street) newCustomer.address.street = street;
                if(aptNum) newCustomer.address.aptNum = aptNum;
                if(city) newCustomer.address.city = city;
                if(state) newCustomer.address.state = addressState._id;
                if(country) newCustomer.address.country = foundCountry._id;
                if(zipcode) newCustomer.address.zipcode = zipcode;
            }
            customers.push(newCustomer);
        }

        const customerList = await Customer.insertMany(customers)
        res.json(customerList)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
//#endregion


//#region CUSTOMER VEHICLES
// @route       POST api/customers/customerId/vehicle
// @desc        Add Customer Vehicle
// @access      private
const addVehicle = async(req, res) => {
    try {
        console.log("newvehicle", req.body)
        const customerId = req.params.customerId;
        let customer = await Customer.findById(customerId);
        if(!customer){
            return res.json({message: [{severity: 'error', msg: "Customer not found", _id: uid()}]})
        }

        const {year, make, model, miles, vin} = req.body

        let newVehicle = customer.vehicles.find(v => v.vin === vin);
        if(newVehicle){
            return res.status(403).json({message: [{severity: "error", msg: "Vehicle already exists", _id: uid()}]})
        }

        customer.vehicles.push({year, make, model, vin, mileage: miles})

        await customer.save();

        res.json(customer)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       POST api/customers/customerId/vehicle/vin/service
// @desc        Add vehicle service
// @access      private
const addVehicleService = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const vin = req.params.vin;
        let customer = await Customer.findById(customerId);
        if(!customer){
            return res.json({message: [{severity: 'error', msg: "Customer not found", _id: uid()}]})
        }
        
        if(!customer.vehicles.find(v => v.vin === vin)){
            return res.json({message: [{severity: 'error', msg: `Customer vehicle with ${vin} not found`, _id: uid()}]})
        }

        const {serviceName, labor, parts, date} = req.body;

        let serviceValue = labor.laborRate * labor.duration;
        parts.forEach(part  => {
            serviceValue += part.unit * part.quantity
        });

        const employee = await Employee.findOne({user: req.user.id})
        let newService = new Service({
            date: date,
            employee: employee._id,
            vehicle: vin,
            serviceName: serviceName,
            serviceValue: serviceValue
        })

        await newService.save()

        for(let i = 0; i < customer.vehicles.length; i++){
            if(customer.vehicles[i].vin === vin){
                customer.vehicles[i].serviceLogs.push(req.body);
            }
        }

        await customer.save();

        res.json(customer)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const deleteVehicleService = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const vin = req.params.vin;
        let customer = await Customer.findById(customerId);
        if(!customer){
            return res.json({message: [{severity: 'error', msg: "Customer not found", _id: uid()}]})
        }
        
        if(!customer.vehicles.find(v => v.vin === vin)){
            return res.json({message: [{severity: 'error', msg: `Customer vehicle with ${vin} not found`, _id: uid()}]})
        }

        customer.vehicles.forEach(vehicle => {
            vehicle.serviceLogs = []
        });

        await customer.save();

        res.json(customer)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route       PUT api/customers/customerId/vehicle
// @desc        udpate Customer Vehicle
// @access      private
const updateCustomerVehicle = async(req, res) => {
    try {
        console.log("updating vehicle")
        const customerId = req.params.customerId;
        let customer = await Customer.findById(customerId);
        if(!customer){
            return res.json({message: [{severity: 'error', msg: "Customer not found", _id: uid()}]})
        }

        let newVehicle = customer.vehicles.find(v => v.vin === req.body.vin);
        if(!newVehicle){
            return res.status(403).json({message: [{severity: "error", msg: "Vehicle does not exists", _id: uid()}]})
        }

        for(let i = 0; i < customer.vehicles.length; i++){
            if(customer.vehicles[i].vin === req.body.vin){
                customer.vehicles[i] = req.body
                console.log("vehicle updated")
            }
        }

        await customer.save();

        res.json(customer)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    addCustomer,
    getCustomerList,
    updateCustomer,
    getCustomerById,

    addVehicle,
    addMultipleCustomers,
    updateCustomerVehicle,
    deleteVehicleService,
    addVehicleService
};