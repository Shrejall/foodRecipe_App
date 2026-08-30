// const mongoose= require("mongoose") // Import mongoose lib

// const connectDb = async()=>{
//     await mongoose.connect(process.env.CONNECTION_STRING)
//     .then(()=>console.log("connected..."))
// }
// module.exports=connectDb
// // connectDb func connect to database and async becoz this connection takes time
// // connection string comes from env file- we have not hardcoded DB credentials directly instead used environment variable for security.

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