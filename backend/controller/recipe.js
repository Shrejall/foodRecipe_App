const Recipes=require("../models/recipe")
const multer  = require('multer') // middleware for file uploads

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images') // when user upload image,it get saved in public/images
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname
      cb(null, filename)
    }
  })

const upload = multer({ storage: storage }) // middleware used in routes

// The endpoint of API calling is defined in routes\ - recipes.js

// Get all recipes
const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

// Get a recipe using ID
const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
}

// Add a new recipe
const addRecipe = async (req, res) => {
    try {
        console.log(req.user);

        let { title, ingredients, instructions, time } = req.body;

        // Validate required fields
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({
                message: "Required fields can't be empty"
            });
        }

        // Since normal recipe forms send ingredients through FormData,
        // the array may arrive as a JSON string.
        if (typeof ingredients === "string") {
            try {
                ingredients = JSON.parse(ingredients);
            } catch (error) {
                // If it's not JSON, keep it as an array with one string value
                ingredients = [ingredients];
            }
        }

        // Image is optional for AI-generated recipes
        const recipeData = {
            title,
            ingredients,
            instructions,
            time,
            createdBy: req.user.id
        };

        // Add coverImage only when a file was uploaded
        if (req.file) {
            recipeData.coverImage = req.file.filename;
        }

        const newRecipe = await Recipes.create(recipeData);

        return res.status(201).json(newRecipe);

    } catch (err) {
        console.error("Error adding recipe:", err);

        return res.status(500).json({
            message: "Error creating recipe",
            error: err.message
        });
    }
};

// Edit a recipe
// If new image given then add new one else keep the old one
const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body 
    let recipe=await Recipes.findById(req.params.id)

    try{
        if(recipe){
            let coverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:err})
    } 
}

// Delete a recipe
const deleteRecipe=async(req,res)=>{
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

const getUserRecipes = async (req, res) => {
    try {
        // req.user.id is provided by the verifyToken middleware
        const recipes = await Recipes.find({ createdBy: req.user.id });
        return res.json(recipes);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching user recipes" });
    }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload, getUserRecipes}
// exported so that these functions can be used in other files.
// Make all functions usable in routes