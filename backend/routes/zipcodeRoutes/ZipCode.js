var mongoose = require('mongoose');

//VehicleMake.js
var zipcodeSchema = new mongoose.Schema({

    zip: {
        type: String,
        required: true
    },
    city: {
        type: "String",
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'countries',
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'states',
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Zipcode', zipcodeSchema);