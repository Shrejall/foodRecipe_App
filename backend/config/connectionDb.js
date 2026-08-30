
const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        // This ensures it reads from your .env file, not a hardcoded Atlas string
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected successfully");
    } catch (error) {
        // This catches the error and stops the app from crashing
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connectDb;