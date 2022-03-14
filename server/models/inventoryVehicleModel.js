const mongoose = require("mongoose");

//InventoryVehicle.js
var inventoryVehicleSchema = new mongoose.Schema({

    year: {
        type: String,
        required: true
    },
    vin: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    make: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'manufacturers',
        required: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'models',
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number,
        default: 0
    },
    isSold: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('InventoryVehicle', inventoryVehicleSchema);