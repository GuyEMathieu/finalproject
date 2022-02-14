const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const msg = 'MongoDB Connected';
        console.log(`${msg}`.magenta.underline.bold)
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;