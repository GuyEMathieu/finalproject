var mongoose = require('mongoose');

//VehicleMake.js
var dayOffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },


    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DayOff', dayOffSchema);