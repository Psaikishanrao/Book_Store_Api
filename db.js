const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
