const express=require("express")
const router=express.Router()
const {userSignUp, userLogin, getUser}=require("../controller/user") 

router.post("/signUp", userSignUp) // creates  new user
router.post("/login", userLogin) 
router.get("/user/:id", getUser)

module.exports=router // export router to server.js