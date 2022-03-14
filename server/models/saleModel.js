//Sale.js

var mongoose = require('mongoose');

var saleSchema = new mongoose.Schema({
    purchaseDate: {
        type: Date,
    },
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'customers'
    },
    vehicle: {
        type: String
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    soldBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "employees"
    },
    paymentType: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Sale', saleSchema);