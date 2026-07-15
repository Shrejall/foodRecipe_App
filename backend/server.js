const express = require('express') // import Express framework
const app = express() // Create your server instance -> app
const dotenv= require("dotenv").config() // .env file is imported
const path = require('path')
const connectDb=require("./config/connectionDb")// imports your DB connection func
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
// Add ".." here too
app.use(express.static(path.resolve(__dirname, '..', 'frontend', 'food-blog-app', 'dist')));

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

// Serve frontend in production (Catch-all route)
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'frontend', 'food-blog-app', 'dist', 'index.html'));
  });
}

app.listen(PORT, (err)=>{
    console.log(`app is listening on the port ${PORT}`)
})