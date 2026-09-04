import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import AIRecipe from './pages/AIRecipe'
import RecipeDetails from './pages/RecipeDetails'
import axios from 'axios'

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
  {path:"/recipe/:id", element:<RecipeDetails/>},
  {path:"/ai-recipe", element:<AIRecipe/>},
  ]}
])

export default function App(){
  return(
    <>
    <RouterProvider router={router}> </RouterProvider>
    </>
  )
}
