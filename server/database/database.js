const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI_DATABASE || 'URI not found'

mongoose.set('strictQuery', false); 

const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully with TODOVISA")
    } catch (error) {
        console.error("Database connection failes:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;