var mongoose = require('mongoose');

//VehicleMake.js
var genderSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Gender', genderSchema);