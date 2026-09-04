const {
    generateRecipe,
    substituteIngredient
} = require("../services/aiService");


const generateRecipeController = async (req, res) => {
    try {
        const { ingredients } = req.body;

        // Validate input
        if (!ingredients || !ingredients.trim()) {
            return res.status(400).json({
                message: "Ingredients are required"
            });
        }

        // Generate recipe using AI service
        const recipe = await generateRecipe(ingredients);

        return res.status(200).json(recipe);

    } catch (err) {
        console.error("AI Controller Error:", err);

        return res.status(500).json({
            message: "Failed to generate recipe",
            error: err.message
        });
    }
};


const substituteIngredientController = async (req, res) => {
    try {
        const { ingredient } = req.body;

        // Validate input
        if (!ingredient || !ingredient.trim()) {
            return res.status(400).json({
                message: "Ingredient is required"
            });
        }

        // Find ingredient substitutes using AI service
        const result = await substituteIngredient(ingredient.trim());

        return res.status(200).json(result);

    } catch (err) {
        console.error("Ingredient Substitution Error:", err);

        return res.status(500).json({
            message: "Failed to find ingredient substitute",
            error: err.message
        });
    }
};


module.exports = {
    generateRecipeController,
    substituteIngredientController
};