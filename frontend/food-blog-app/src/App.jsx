import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import axios from 'axios'

// const getAllRecipes=async()=>{
//   let allRecipes=[]
//   await axios.get('http://localhost:5174/recipe').then(res=>{
//     allRecipes=res.data})
//     return allRecipes
// }

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getAllRecipes = async () => {
  // const response = await axios.get('http://localhost:5000/recipe'); 
  const response = await axios.get(`${backendUrl}/recipe`);
  return response.data; 
}

// Likely in App.jsx or your Router config file
export const getMyRecipes = async () => {
  const token = localStorage.getItem("token");
    // 1. You MUST send the token so the backend knows who is logged in
    if (!token) return [];

  try {
    const response = await axios.get(`${backendUrl}/recipe/userRecipe`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data ?? [];
  } catch (err) {
    console.error("Failed to fetch user recipes:", err);
    return [];
  }
}

// const getMyRecipes=async()=>{
//   let user =JSON.parse(localStorage.getItem("user"))
//   let allRecipes=await getAllRecipes()
//   return allRecipes.filter(item=>item.createdBy===user._id)
// }

// const getMyRecipes = async () => {
//   let user = JSON.parse(localStorage.getItem("user"));
  
//   if (!user) {
//     return []; 
//   }

//   let allRecipes = await getAllRecipes();
  
//   // Ensure the logged-in user ID is a string
//   let userId = String(user._id || user.id); 
  
//   return allRecipes.filter(item => {
//     if (!item.createdBy) return false;

//     // Extract the ID whether it was sent as an object or a raw string
//     let creatorId = String(item.createdBy._id || item.createdBy);
    
//     // Compare the two strings
//     return creatorId === userId;
//   });
// }

const getFavRecipe=()=>{
  return JSON.parse(localStorage.getItem("fav")) ?? [];
}

const router = createBrowserRouter([
  {path:"/", element:<MainNavigation/>, children:[
  {path:"/",element:<Home/>,loader:getAllRecipes},
  {path:"/myRecipe", element:<Home/>, loader:getMyRecipes},
  {path:"/favRecipe", element:<Home/>, loader: getFavRecipe},
  {path:"/addRecipe", element:<AddFoodRecipe/>},
  {path:"/editRecipe/:id", element:<EditRecipe/>},
  ]}
])

export default function App(){
  return(
    <>
    <RouterProvider router={router}> </RouterProvider>
    </>
  )
}
