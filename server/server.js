const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const app = express();
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path')


// Connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
        
    } catch (err) {
        console.log(`Error: ${err.message}`.red.underline.bold)
        process.exit(1);
    }
}
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/defaults', require('./routes/defaultRoutes'))
app.use('/api/inventoryvehicles', require('./routes/inventoryVehicleRoutes'))
app.use('/api/employees', require('./routes/employeeRoutes'))
app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/sales', require('./routes/saleRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))

app.use(errorHandler)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: "Welcome to gemsoft API"})
    })
}

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
