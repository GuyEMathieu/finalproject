var mongoose = require('mongoose');

//VehicleMake.js
var CustomerVehicleSchema = new mongoose.Schema({

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
    vin:{
        type: String,
        required: true
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

module.exports = mongoose.model('CustomerVehicle', CustomerVehicleSchema);