const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000
const app = express();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Connect to DB
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/defaults', require('./routes/defaultRoutes'))
app.use('/api/inventoryvehicles', require('./routes/inventoryVehicleRoutes'))
app.use('/api/employees', require('./routes/employeeRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
