const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const InventoryVehicle = require('./InventoryVehicle');
const VehicleSale = require('./VehicleSale');

const VehicleMake = require('../vehicleRoutes/VehicleMake');
const VehicleModel = require('../vehicleRoutes/VehicleModel');
const auth = require('../userAuthRoutes/authController');
const { v4: uid } = require('uuid');
const Customer = require('../customer_routes/Customer');

//#region Vehicles

// @route       GET api/inventory/vehicles
// @desc        Get inventory vehicle  list
// @access      private
router.get('/vehicles', auth, async (req, res) => {

    try {
        const vehicles = await InventoryVehicle.find({isSold: false})
            .select('-lastModified').select('-__v')
            .sort({name: 1});
        
        res.json(vehicles);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/inventory/vehicles
// @desc        Get inventory vehicle  list
// @access      private
router.get('/vehicles/:id', auth, async (req, res) => {

    try {
        const _id = req.params.id
        const vehicle = await InventoryVehicle.findById(_id)
            .select('-lastModified').select('-__v')
            .sort({name: 1});
                
        res.json(vehicle);

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/inventory/vehicles/purchase
// @desc        POST inventory vehicle  list
// @access      private
router.post('/vehicles/purchase', auth, async (req, res) => {

    try {
        const {
            customer, vehicle
        } = req.body

        let _vehicle = await InventoryVehicle.findById(vehicle)

        const {
            firstName, middleName, lastName, gender,
            dateOfBirth, email, ssn, phone, address
        } = customer

        const { street, aptNum, city, state, country, zipcode } = address;

        let _customer = await Customer.findOne({ firstName, lastName, dateOfBirth });

        if(!_customer){
            _customer = new Customer({
                firstName: firstName, 
                middleName: middleName,
                lastName: lastName, 
                dateOfBirth: dateOfBirth,
                ssn: ssn, email: email,
                phone: phone, gender: gender,
                address,
                vehicles: [{
                    year: _vehicle.year,
                    make: _vehicle.make,
                    model: _vehicle.model,
                    vin: _vehicle.vin,
                    mileage: _vehicle.mileage,
                }]
            })

            await _customer.save()
            
        } else {
            let fields = {}

            if (firstName) fields.firstName = firstName
            if (middleName) fields.middleName = middleName
            if (lastName) fields.lastName = lastName
            if (gender) fields.gender = gender
            if (email) fields.email = email
            if (phone) fields.phone = phone
            if (ssn) fields.ssn = ssn
            
            if(address) {
                fields.address = {}
                if (street) fields.address.street = street
                if (aptNum) fields.address.aptNum = aptNum
                if (city) fields.address.city = city
                if (state) fields.address.state = state
                if (country) fields.address.country = country
                if (zipcode) fields.address.zipcode = zipcode
            }

            fields.vehicles = _customer.vehicles   
            fields.vehicles.push({
                year: _vehicle.year,
                make: _vehicle.make,
                model: _vehicle.model,
                vin: _vehicle.vin,
            })
            
            _customer = await Customer.findOneAndUpdate({_id: _customer._id}, {$set: fields}, {new: true})
        }
        
        const {
            price, tagFee, dealerFees, credits, taxes, total, paymentType,
            financialInstitution, selectedTerm, apr, totalInterest, totalLoanAtEnd,
            termLength, monthlyPayment, cashReceived, otherCharges
        } = req.body

        let vehicleSale = new VehicleSale({
            customer: _customer._id,
            vehicle, price, tagFee, dealerFees, credits, taxes, paymentType,
            totalPaid: total, selectedTerm, termLength, apr, totalInterest, 
            datePurchase : new Date(), monthlyPayment, financialInstitution,
            totalLoanAtEnd, otherCharges,
            cashReceived: paymentType === 'Finance' ? cashReceived : total
        })
        await vehicleSale.save()

                
        res.json({
            alerts: [{severity: 'success', msg: 'Congratulations!!', _id: uid()}],
            receipt: vehicleSale
        });

    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

// @route       GET api/inventory/vehicles
// @desc        Get inventory vehicle  list
// @access      private
router.post('/vehicles/multiple', auth, async (req, res) => {

    try {
        let vehicles = []
        for(let i = 0; i < req.body.length; i++){
            
            const make = await VehicleMake.findOne({name: req.body[i].make})
            const model = await VehicleModel.findOne({name: req.body[i].model})

            let _vehicle = req.body[i]
            _vehicle.image = '/images/car.jpg'
            _vehicle.make = make._id
            _vehicle.model = model._id
            vehicles.push(_vehicle)
        }

        vehicles = await InventoryVehicle.insertMany(vehicles)

        res.json(vehicles)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})



module.exports = router;