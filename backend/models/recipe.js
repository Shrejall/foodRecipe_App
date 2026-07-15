const mongoose=require("mongoose")

const recipeSchema=mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    ingredients:{
        type: Array,
        required:true
    },
    instructions:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    coverImage:{
        type: String,
        required:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, // objectId is defined to track the user details under which this recipe data is stored
        ref:"User"
    }

}, {timestamps:true})

module.exports= mongoose.model("Recipe", recipeSchema); // create collection in DB and collection name is recipe.
// this file define the structure of recipe data stored in database  