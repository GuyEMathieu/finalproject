// Employee.js

const mongoose = require('mongoose');



//#region Employment Info
const employmentInfoSchema = new mongoose.Schema({
    employeeNumber: {
        type: Number,
        required: true,
        unique: true
    },
    startDate: {
        type: Date
    },
    position: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'positions'
    },
    department: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'departments'
    },
    salary: {
        type: Number
    }
})
//#endregion

//#region DRIVER LICENSE
const driverLicenseSchema = new mongoose.Schema({
    dlState: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'states'
    },
    dlNumber:{
        type: String
    }
},{
    timestamps: true
})
//#endregion

//#region ADDRESS
const addressSchema = new mongoose.Schema({
    street:{
        type: String
    },
    aptNum:{
        type: String
    },
    city:{
        type: String
    },
    
    zipcode:{
        type: String
    },
    state: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'states'
    },
    country: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'countries'
    },
    
},{
    timestamps: true
})
//#endregion

//#region Employee Schema
const employeeSchema = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    ssn: {
        type: String,
        unique: true
    },
    team: {
        type: String
    },
    avatar: {
        type: String
    },
    gender: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'genders'
    },
    driverLicense: driverLicenseSchema,
    address: addressSchema,
    employmentInfo: employmentInfoSchema,

}, {
    timestamps: true
})

//#endregion

module.exports = mongoose.model('Employee', employeeSchema)
