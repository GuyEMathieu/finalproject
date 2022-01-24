const express = require('express');
const colors = require('colors')
const app = express();

const { connect } = require("mongoose");
const connectDB = require("./config/db");

// Connect Database
connectDB();

// //Init Middleware
app.use(express.json({ extended: false, limit: '50mb' }));

app.get('/', (req, res) => ({ msg: 'Welcome to  API' }));


// Default Routes
app.use('/api/defaults', require('./routes/defaultRoutes/defaultController'))

// Genders Routes
app.use('/api/genders', require('./routes/genderRoutes/genderController'))

// Country Routes
app.use('/api/countries', require('./routes/countryRoutes/countryController'))

// Zipcode Routes
app.use('/api/zipcodes', require('./routes/zipcodeRoutes/zipcodeController'))

// States Routes
app.use('/api/states', require('./routes/stateRoutes/stateController'))

// States Routes
app.use('/api/banks', require('./routes/bankRoutes/bankController'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`.cyan.underline.bold))