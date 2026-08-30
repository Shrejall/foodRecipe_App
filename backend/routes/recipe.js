const express=require("express")
// Import controller functions
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload, getUserRecipes} = require("../controller/recipe")
// only logged-in users are allowed
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes) //Get all recipes
router.get("/userRecipe", verifyToken, getUserRecipes)
router.get("/:id",getRecipe) //Get recipe by id
router.post("/",verifyToken ,upload.single('file'),addRecipe) //add recipe
router.put("/:id",upload.single('file'),editRecipe) //Edit recipe
router.delete("/:id", verifyToken, deleteRecipe) //Delete recipe

module.exports=router
// export router so it can be used in server.js
