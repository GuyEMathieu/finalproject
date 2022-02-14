//Country.js

var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Country', countrySchema);