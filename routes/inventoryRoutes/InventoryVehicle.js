var mongoose = require('mongoose');

//VehicleMake.js
var InventoryVehicleSchema = new mongoose.Schema({

    price: {
        type: Number,
        required: true
    },
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
    isSold:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('InventoryVehicle', InventoryVehicleSchema);