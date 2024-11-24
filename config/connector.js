const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        throw new Error("Database connection failed. Check your MongoDB URL or status.");
    }
};

module.exports = {
    connectDB
}