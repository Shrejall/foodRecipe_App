import React, { useState } from 'react'
import Recipe_App from '../assets/recipe_app.jpg' // image for UI
import RecipeItems from '../components/RecipeItems' // component that shows all recipes
import {useNavigate} from 'react-router-dom' //used for navigation b/w pages
import Modal from '../components/Modal' // popup component
import InputForm from '../components/InputForm' // form inside model



export default function Home() {
    const navigate=useNavigate()
    // isOpen- model visible or not and setIsOpen - update it
    const [isOpen, setIsOpen] = useState(false)
    const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token) navigate("/addRecipe") // user logged in-> redirected to add recipe page
            else{ setIsOpen(true) }  // open login modal
    }
  return (
    <>
    {/* <Navbar/> */}
    <section className ='home'>
        <div className='left'>
            <h1>Food Recipe</h1>
            <h5>
Welcome to our food community where taste meets creativity. 
Explore a variety of recipes made for every mood and occasion. 
Whether you love experimenting in the kitchen or sticking to 
classic comfort meals, this is your space to discover, create, 
and share amazing flavors.
</h5>
            <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className ='right'>
            <img src={Recipe_App} width="320px" height="300px">
            </img>
        </div>
    </section>
    <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,32L60,64C120,96,240,160,360,186.7C480,213,600,203,720,181.3C840,160,960,128,1080,133.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    </div>
     { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    <div className='recipe'>
        <RecipeItems/>
    </div>
    </>
  )
}