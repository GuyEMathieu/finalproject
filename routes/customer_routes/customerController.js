const express = require('express');
const router = express.Router();
const auth = require('../userAuthRoutes/auth');
const { v4: uid } = require('uuid');
const Customer = require('./Customer')
const {check, validationResult} = require('express-validator')

// @route       GET api/baseVehicle/
// @desc        Get  Manufacturer and Model lists
// @access      private
router.get('/', auth, async (req, res) => {
    try {

        const customers = await Customer.find()
            .select('-__v').select('-lastModified')
            //.sort({name: 1})
        
        res.json(customers)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

router.post('/', [auth, [
        check('firstName', "A valid email is required").not().isEmpty(),
        check('lastName', "A last name is required").not().isEmpty(),
        check('dateOfBirth', "A date of Birth is required").not().isEmpty(),
    ]],
    async (req, res) => {

        if (!validationResult(req).isEmpty()) {
            const errors = validationResult(req).array();
            let alerts = []
            for (let i = 0; i < errors.length; i++){
                alerts.push({severity: 'error', msg: errors[i].msg, _id: uid()})
            }
            return res.status(400).json({alerts: alerts})
        }
        try {
            const { firstName, middleName, lastName, gender, dateOfBirth, email, phone, address, vehicles } = req.body

            let newCustomer = await Customer.findOne({ firstName, lastName, dateOfBirth });

            if (newCustomer) {
                return res.status(500).json({alerts: [{_id: uid(), msg: 'Customer exists', severity: 'error'}]})
            }

            let fields = {
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
            }

            if (middleName) fields.middleName = middleName
            if (email) fields.email = email
            if (gender) fields.gender = gender
            if (phone) fields.phone = phone

            if (address) {
                fields.address = {}
                const {street, aptNum, city, state, country, zipcode} = address

                if(street) fields.address.street = street
                if(aptNum) fields.address.aptNum = aptNum
                if(city) fields.address.city = city
                if(state) fields.address.state = state
                if(country) fields.address.country = country
                if(zipcode) fields.address.zipcode = zipcode
            }

            if(vehicles) {
                fields.vehicles = []
                
                for(let v = 0; v < vehicles.length; v++){
                    let {year, make, model, mileage, vin} = vehicles[v]

                    if(!vin){
                        vin = generateVin()
                    }
                    fields.vehicles.push({
                        year, 
                        make, 
                        model, 
                        mileage,
                        vin
                    })
                }
            }

            newCustomer = new Customer(fields);
            await newCustomer.save();


            res.json(newCustomer)
        } catch (err) {
            console.error(err.msg);
            res.status(500).send('Server Error');
        }
    }
)

router.post('/:customerId/vehicle', auth, async (req, res) =>{
    try{

        console.info("New Vehicle Post Triggered")
        const id = req.params.customerId;
        console.info("Id", id)
        let customer = await Customer.findById(id)



        let vehicle = req.body;
        if(!vehicle.vin) vehicle.vin = generateVin()

        customer.vehicles.push(vehicle);

        await customer.save()
        
        res.json(customer)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error');
    }
})

module.exports = router

function generateVin () {
    const stringSource ='ABCDEFJHJKLMNPQRSTUVWXYZ0123456789'
    let vin = ''
    
    for(let i = 0; i < 17; i++){
        const index = Math.floor(Math.random() * (stringSource.length - 0) + 0)
        vin = vin.concat(stringSource[index])
    }
    return vin
}