var mongoose = require('mongoose');

var vehicleModelSchema = new mongoose.Schema({
    make: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'vehiclemakes'
    },
    name: {
        type: String,
        required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('VehicleModel', vehicleModelSchema);