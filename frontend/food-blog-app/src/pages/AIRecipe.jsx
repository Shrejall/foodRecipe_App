import React, { useState } from 'react';
import axios from 'axios';
import './AIRecipe.css';

export default function AIRecipe() {
    // AI Recipe Generator state
    const [ingredients, setIngredients] = useState("");
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saveMessage, setSaveMessage] = useState("");

    // Ingredient Substitute state
    const [substituteIngredient, setSubstituteIngredient] = useState("");
    const [substitutes, setSubstitutes] = useState(null);
    const [substituteLoading, setSubstituteLoading] = useState(false);
    const [substituteError, setSubstituteError] = useState("");


    const handleGenerateRecipe = async (e) => {
        e.preventDefault();

        if (!ingredients.trim()) {
            setError("Please enter at least one ingredient.");
            return;
        }

        setLoading(true);
        setError("");
        setSaveMessage("");
        setRecipe(null);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(
                `${backendUrl}/ai/generate-recipe`,
                {
                    ingredients: ingredients.trim()
                }
            );

            setRecipe(response.data);

        } catch (err) {
            console.error("Error generating recipe:", err);

            setError(
                err.response?.data?.message ||
                "Failed to generate recipe. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleSaveRecipe = async () => {
        if (!recipe) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login to save a recipe.");
            return;
        }

        setSaving(true);
        setError("");
        setSaveMessage("");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            // Convert AI-generated steps into the existing
            // Recipe model's instructions string.
            const instructions = Array.isArray(recipe.steps)
                ? recipe.steps
                    .map((step, index) => `${index + 1}. ${step}`)
                    .join("\n")
                : "";

            const formData = new FormData();

            formData.append("title", recipe.title);
            formData.append(
                "ingredients",
                JSON.stringify(recipe.ingredients)
            );
            formData.append("instructions", instructions);
            formData.append("time", recipe.time);

            // No image is appended because this is an AI-generated recipe.

            await axios.post(
                `${backendUrl}/recipe`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSaveMessage("Recipe saved successfully!");

        } catch (err) {
            console.error("Error saving AI recipe:", err);

            setError(
                err.response?.data?.message ||
                "Failed to save recipe. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };


    const handleFindSubstitutes = async (e) => {
        e.preventDefault();

        if (!substituteIngredient.trim()) {
            setSubstituteError("Please enter an ingredient.");
            return;
        }

        setSubstituteLoading(true);
        setSubstituteError("");
        setSubstitutes(null);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.post(
                `${backendUrl}/ai/substitute`,
                {
                    ingredient: substituteIngredient.trim()
                }
            );

            setSubstitutes(response.data);

        } catch (err) {
            console.error("Error finding ingredient substitutes:", err);

            setSubstituteError(
                err.response?.data?.message ||
                "Failed to find substitutes. Please try again."
            );
        } finally {
            setSubstituteLoading(false);
        }
    };


    return (
        <div className="ai-recipe-page">
            <div className="ai-recipe-wrapper">

                {/* AI Recipe Generator */}
                <form
                    className="ai-recipe-form"
                    onSubmit={handleGenerateRecipe}
                >
                    <h2>AI Recipe Generator</h2>

                    <div className="ai-input-group">
                        <label htmlFor="ingredients">
                            What ingredients do you have?
                        </label>

                        <textarea
                            id="ingredients"
                            name="ingredients"
                            rows="5"
                            placeholder="Example: paneer, onion, tomato, capsicum"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="ai-error">
                            {error}
                        </p>
                    )}

                    {saveMessage && (
                        <p className="ai-success">
                            {saveMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="ai-generate-button"
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Recipe"}
                    </button>
                </form>


                {/* Generated Recipe */}
                {recipe && (
                    <div className="ai-result">

                        <h2>{recipe.title}</h2>

                        {/* Ingredients */}
                        <div className="ai-result-section">
                            <h3>Ingredients</h3>

                            <ul>
                                {Array.isArray(recipe.ingredients) &&
                                    recipe.ingredients.map(
                                        (ingredient, index) => (
                                            <li key={index}>
                                                {ingredient}
                                            </li>
                                        )
                                    )}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="ai-result-section">
                            <h3>Instructions</h3>

                            <ol>
                                {Array.isArray(recipe.steps) &&
                                    recipe.steps.map((step, index) => (
                                        <li key={index}>
                                            {step}
                                        </li>
                                    ))}
                            </ol>
                        </div>

                        {/* Cooking Time */}
                        <div className="ai-result-section">
                            <h3>Cooking Time</h3>

                            <p className="ai-time">
                                {recipe.time}
                            </p>
                        </div>

                        {/* Save Recipe */}
                        <div className="ai-save-section">
                            <button
                                type="button"
                                className="ai-save-button"
                                onClick={handleSaveRecipe}
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Recipe"}
                            </button>
                        </div>

                    </div>
                )}


                {/* Ingredient Substitute */}
                <form
                    className="ai-substitute-form"
                    onSubmit={handleFindSubstitutes}
                >
                    <h2>Ingredient Substitute</h2>

                    <p className="ai-substitute-description">
                        Don't have an ingredient? Enter its name to get
                        suitable alternatives.
                    </p>

                    <div className="ai-input-group">
                        <label htmlFor="substituteIngredient">
                            Which ingredient do you need a substitute for?
                        </label>

                        <input
                            type="text"
                            id="substituteIngredient"
                            name="substituteIngredient"
                            placeholder="Example: butter"
                            value={substituteIngredient}
                            onChange={(e) =>
                                setSubstituteIngredient(e.target.value)
                            }
                        />
                    </div>

                    {substituteError && (
                        <p className="ai-error">
                            {substituteError}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="ai-generate-button"
                        disabled={substituteLoading}
                    >
                        {substituteLoading
                            ? "Finding Substitutes..."
                            : "Find Substitutes"}
                    </button>
                </form>


                {/* Substitute Results */}
                {substitutes && (
                    <div className="ai-result ai-substitute-result">

                        <h2>
                            Substitutes for {substitutes.ingredient}
                        </h2>

                        <div className="ai-substitute-list">
                            {Array.isArray(substitutes.substitutes) &&
                                substitutes.substitutes.map(
                                    (substitute, index) => (
                                        <div
                                            className="ai-substitute-item"
                                            key={index}
                                        >
                                            <h3>
                                                {index + 1}. {substitute.name}
                                            </h3>

                                            <p>
                                                <strong>Amount:</strong>{" "}
                                                {substitute.amount}
                                            </p>

                                            <p>
                                                <strong>Why it works:</strong>{" "}
                                                {substitute.reason}
                                            </p>
                                        </div>
                                    )
                                )}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}