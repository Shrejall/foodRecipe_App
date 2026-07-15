const mongoose= require("mongoose") // Import mongoose lib

const connectDb = async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("connected..."))
}
module.exports=connectDb
// connectDb func connect to database and async becoz this connection takes time
// connection string comes from env file- we have not hardcoded DB credentials directly instead used environment variable for security.
