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

const getAllRecipes = async () => {
  const response = await axios.get('/recipe'); 
  // This is a much cleaner way to write this function.
  // The 'response.data' will be returned to useLoaderData().
  return response.data; 
}

const getMyRecipes=async()=>{
  let user =JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}

const getFavRecipe=()=>{
  return JSON.parse(localStorage.getItem("fav"))
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
