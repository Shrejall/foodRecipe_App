// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function AddFoodRecipe() {
//     const [recipeData, setRecipeData] = useState({})
//     const navigate = useNavigate()
//     const onHandleChange = (e) => {
//         let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
//         setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
//     }
//     const onHandleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(recipeData)
//         // POST /recipe
//         await axios.post("http://localhost:5000/recipe", recipeData,{
//             headers:{
//                 'Content-Type':'multipart/form-data',
//                 'authorization':'bearer '+localStorage.getItem("token")
//             }
//         })
//             .then(() => navigate("/"))
//     }
//     return (
//         <>
//             <div className='container'>
//                 <form className='form' onSubmit={onHandleSubmit}>
//                     <div className='form-control'>
//                         <label>Title</label>
//                         <input type="text" className='input' name="title" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Time</label>
//                         <input type="text" className='input' name="time" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Ingredients</label>
//                         <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Instructions</label>
//                         <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Recipe Image</label>
//                         <input type="file" className='input' name="file" onChange={onHandleChange}></input>
//                     </div>
//                     <button type="submit">Add Recipe</button>
//                 </form>
//             </div>
//         </>
//     )
// }

const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Package the data into FormData
    const formData = new FormData();
    formData.append('title', recipeData.title);
    formData.append('time', recipeData.time);
    formData.append('instructions', recipeData.instructions);
    
    // Arrays must be converted to strings to append to FormData
    formData.append('ingredients', JSON.stringify(recipeData.ingredients)); 
    
    // Append the actual image file
    formData.append('file', recipeData.file); 

    try {
        // 2. Send the request with the multipart/form-data header
        const response = await axios.post('http://localhost:5000/recipe', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Include your JWT token if the backend route requires authentication
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        });
        
        console.log("Recipe saved:", response.data);
    } catch (error) {
        console.error("Error saving recipe:", error);
    }
}
export default AddFoodRecipe;