import React, { useEffect, useState } from "react";
import {
    Link,
    useLoaderData,
    useNavigate,
    useLocation
} from "react-router-dom";

import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestaurant } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {

    const recipes = useLoaderData();

    const [allRecipes, setAllRecipes] = useState([]);

    const location = useLocation();

    const path = location.pathname === "/myRecipe";

    const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? []
    );

    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Load recipes
    useEffect(() => {
        if (location.pathname === "/favRecipe") {
            const favorites = JSON.parse(localStorage.getItem("fav")) ?? [];
            setAllRecipes(favorites);
        } else {
            setAllRecipes(recipes);
        }
    }, [recipes, location.pathname]);


    // Delete recipe
    const onDelete = async (id) => {

        const token = localStorage.getItem("token");

        try {

            await axios.delete(
                `${backendUrl}/recipe/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Remove recipe from UI
            setAllRecipes((recipes) =>
                recipes.filter(
                    (recipe) => recipe._id !== id
                )
            );

            // Remove from favourites
            const filterItem = favItems.filter(
                (recipe) => String(recipe._id) !== String(id)
            );

            setFavItems(filterItem);

            localStorage.setItem(
                "fav",
                JSON.stringify(filterItem)
            );
            

        } catch (err) {

            console.error(
                "Failed to delete recipe:",
                err
            );

        }
    };


    // Add / remove favourite
    const favRecipe = (item) => {

    const alreadyFavourite = favItems.some(
        (recipe) =>
            String(recipe._id) === String(item._id)
    );

    let updatedFavItems;

    if (alreadyFavourite) {

        updatedFavItems = favItems.filter(
            (recipe) =>
                String(recipe._id) !== String(item._id)
        );

    } else {

        updatedFavItems = [
            ...favItems,
            item
        ];
    }

    setFavItems(updatedFavItems);

    localStorage.setItem(
        "fav",
        JSON.stringify(updatedFavItems)
    );
};


    return (
        <div className="card-container">

            {Array.isArray(allRecipes) &&
                allRecipes.map((item) => (

                    <div
                        key={item._id}
                        className="card"
                        onDoubleClick={() =>
                            navigate(`/recipe/${item._id}`)
                        }
                    >

                        {/* =========================
                            RECIPE IMAGE
                        ========================= */}

                        <div className="recipe-image">

                            {item.coverImage ? (

                                <img
                                    src={`${backendUrl}/images/${item.coverImage}`}
                                    alt={item.title}
                                />

                            ) : (

                                <div className="recipe-placeholder">

                                    <MdRestaurant className="placeholder-icon" />

                                    <span>
                                        AI Recipe
                                    </span>

                                </div>

                            )}

                        </div>


                        {/* =========================
                            RECIPE DETAILS
                        ========================= */}

                        <div className="card-body">

                            <div className="title">
                                {item.title}
                            </div>


                            <div className="icons">

                                {/* Cooking time */}

                                <div className="timer">
                                    <BsStopwatchFill />
                                    {item.time}
                                </div>


                                {/* Favourite / Edit / Delete */}

                                {!path ? (

                                    <FaHeart
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            favRecipe(item);
                                        }}
                                        style={{
                                            color: favItems.some(
                                                (recipe) =>
                                                    String(recipe._id) === String(item._id)
                                            )
                                                ? "red"
                                                : "black"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="action"
                                        onDoubleClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >

                                        {/* Edit */}

                                        <Link
                                            to={`/editRecipe/${item._id}`}
                                            className="editIcon"
                                            onClick={(e) =>
                                                e.stopPropagation()
                                            }
                                        >
                                            <FaEdit />
                                        </Link>


                                        {/* Delete */}

                                        <MdDelete
                                            className="deleteIcon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item._id);
                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

        </div>
    );
}