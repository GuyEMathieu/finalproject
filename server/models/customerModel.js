const mongoose = require('mongoose');

// partSchema
const partSchema = new mongoose.Schema({
    partName: {
        type: String,
    },
    quantity: {type: Number, default: 1},
    unit: {type: Number, default: 1},
    cost: {type: Number}
})

//serviceLogs
const serviceLogsSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    serviceName: {type: String},
    labor: {
        laborRate: {type: Number, default: 95.99},
        duration: {type: Number, default: 1},
        cost: {type: Number},
    },
    parts:[partSchema]
})

//VehicleSchema
const vehicleSchema = new mongoose.Schema({

    year: {
        type: Number,
        required: true
    },
    vin: {type: String, required: true},
    make: {type: String},
    model: {type: String},
    mileage: {type: Number},
    serviceLogs: [serviceLogsSchema]
},{
    timestamps: true
})

//Customer.js
const customerSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'genders',   
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    ssn: {
        type: String
    },
    driverLicense: {
        dlNumber: {
            type: String,
        },
        dlState: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'states',   
        }
    },
    address: {
        street: {type: String},
        aptNum: { type: String},
        city: {type: String},
        state: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'states',
        },
        country: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'countries',
        },
        zipcode: {type: String}
    },
    vehicles: [vehicleSchema]
},{
    timestamps: true
})



module.exports = mongoose.model('Customer', customerSchema);