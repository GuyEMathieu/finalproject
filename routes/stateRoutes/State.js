//State.js

var mongoose = require('mongoose');

var stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'countries',
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('State', stateSchema);