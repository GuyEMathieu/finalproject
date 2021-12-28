var mongoose = require('mongoose');

//VehicleMake.js
var VehicleSaleSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventoryVehicles'
    },
    price: {
        type: Number,
        //required: true
    },
    tagFee: {
        type: Number,
        //required: true
    },
    dealerFees: {
        type: Number,
        default: 0
    },
    credits: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    totalPaid: {
        type: Number,
        default: 0
    },
    paymentType: {
        type: String,
        required: true
    },
    financialInstitution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'banks',
    },

    selectedTerm: {
        type: String,
        default: null
    },
    apr: {
        type: Number,
        default: 0
    },
    termLength: {
        type: Number,
        default: 0
    },
    totalInterest: {
        type: Number,
        default: 0
    },
    monthlyPayment: {
        type: Number,
        default: 0
    },
    cashReceived: {
        type: Number,
        default: 0
    },
    otherCharges: {
        type: Number,
        default: 0
    },
    totalLoanAtEnd: {
        type: Number,
        default: 0
    },
    datePurchase: {
        type: Date,
        required: true
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('VehicleSale', VehicleSaleSchema);