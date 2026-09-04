import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function RecipeDetails() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/recipe/${id}`
                );

                setRecipe(response.data);
            } catch (err) {
                console.error("Error fetching recipe:", err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load recipe."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <h2>Loading recipe...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <p className="error">{error}</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="container">
                <h2>Recipe not found.</h2>
            </div>
        );
    }

    return (
        <div className="recipe-details-page">
            <div className="recipe-details-card">

                <h1>{recipe.title}</h1>

                {recipe.coverImage && (
                    <img
                        src={`${backendUrl}/images/${recipe.coverImage}`}
                        alt={recipe.title}
                        className="recipe-details-image"
                    />
                )}

                <div className="recipe-details-section">
                    <h2>Ingredients</h2>

                    <ul>
                        {Array.isArray(recipe.ingredients) &&
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="recipe-details-section">
                    <h2>Instructions</h2>

                    <p className="recipe-instructions">
                        {recipe.instructions}
                    </p>
                </div>

                <div className="recipe-details-section">
                    <h2>Cooking Time</h2>

                    <p className="recipe-time">
                        {recipe.time}
                    </p>
                </div>

            </div>
        </div>
    );
}