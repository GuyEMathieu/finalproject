var mongoose = require('mongoose');

//VehicleMake.js
var vehicleMakeSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('VehicleMake', vehicleMakeSchema);