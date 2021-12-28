//State.js

var mongoose = require('mongoose');

var zipcodeSchema = new mongoose.Schema({
    postal: {
        type: String,
        required: true
    },

    // state: {
    //     type: mongoose.Schema.Types.ObjectID,
    //     ref: 'states',
    //     //required: true
    // },
    // country: {
    //     type: mongoose.Schema.Types.ObjectID,
    //     ref: 'countries',
    // },

    county:{
        type: String,
        // required: true
    },

    city: {
        type: String,
        // required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Zipcode', zipcodeSchema);