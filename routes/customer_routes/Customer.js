var mongoose = require('mongoose');

var customerAddressSchema = new mongoose.Schema({
    street: {
        type: String,
    },
    aptNum: {
        type: String,
        default: null
    },
    city: {
        type: String,
    },
    zipcode: {
        type: String
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states'
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries' 
    }
})

module.exports = mongoose.model('CustomerAddress', customerAddressSchema); 

var vehicleServiceLogSchema = new mongoose.Schema({

    serviceDate: {
        type: Date
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('VehicleServiceLog', vehicleServiceLogSchema);

//VehicleMake.js
var customerVehicleSchema = new mongoose.Schema({

    year:{
        type: Number,
        required: true
    },
    make: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manufacturers'
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'models'
    },
    serviceLogs: [vehicleServiceLogSchema],
    vin:{
        type: String,
        //required: true
    },
    mileage: {
        type: Number,
        default: 0
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})


//Customer.js
var customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required: true
    },
    middleName: {
        type: String,
       // default: null
    },
    lastName: {
        type: String,
        //required: true
    },
    dateOfBirth: {
        type: Date,
        //required: true
    },
    ssn: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'genders'
    },
    driverLicense: {
        dlState: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'states'
        },
        dlNumber: {
            type: String,
        },
    },

    vehicles: [customerVehicleSchema],
    address: customerAddressSchema,

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema);