
// const mongoose = require("mongoose");

// const connectDb = async () => {
//     try {
//         // This ensures it reads from your .env file, not a hardcoded Atlas string
//         await mongoose.connect(process.env.CONNECTION_STRING);
//         console.log("Database connected successfully");
//     } catch (error) {
//         // This catches the error and stops the app from crashing
//         console.error("Database connection failed:", error.message);
//     }
// };

// module.exports = connectDb;


// const mongoose = require("mongoose");
// const dns = require("dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.CONNECTION_STRING);
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//     }
// };

// module.exports = connectDb;

const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connectDb;