const express = require("express");

const {
    generateRecipeController,
    substituteIngredientController
} = require("../controller/ai");

const router = express.Router();


// Generate recipe from multiple ingredients
router.post("/generate-recipe", generateRecipeController);


// Find substitutes for a single ingredient
router.post("/substitute", substituteIngredientController);


module.exports = router;