// import Express framework
const express = require('express')
// Create your server instance -> app
const app = express()
// .env file is imported
const dotenv= require("dotenv").config()
// imports your DB connection func
const connectDb=require("./config/connectionDb")
const cors=require("cors")
//CORS - cross origin resource sharing
// allow frontend to talk to backend

// server is connected to port immediately
const PORT = process.env.PORT || 5000
connectDb() // this func runs immediately and backend is connected to MongoDB

// Middleware func.
// these functions are executed only when req arrives
app.use(express.json())
app.use(cors())
app.use(express.static("frontend/food-blog-app/dist"))

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

// Serve frontend in production (Catch-all route)
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'food-blog-app', 'dist', 'index.html'));
  });
}

app.listen(PORT, (err)=>{
    console.log(`app is listening on the port ${PORT}`)
})