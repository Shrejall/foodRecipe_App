import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function EditRecipe() {

    const [recipeData, setRecipeData] = useState({});
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();


    // Fetch existing recipe
    useEffect(() => {

        const getData = async () => {

            try {

                const response = await axios.get(
                    `${backendUrl}/recipe/${id}`
                );

                const res = response.data;

                setRecipeData({
                    title: res.title,
                    ingredients: Array.isArray(res.ingredients)
                        ? res.ingredients.join(",")
                        : "",
                    instructions: res.instructions,
                    time: res.time
                });

            } catch (err) {

                console.error(
                    "Failed to fetch recipe:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load recipe."
                );
            }
        };

        getData();

    }, [id]);


    // Handle input changes
    const onHandleChange = (e) => {

        const { name, value, files } = e.target;

        let val;

        if (name === "ingredients") {
            val = value;
        } else if (name === "file") {
            val = files[0];
        } else {
            val = value;
        }

        setRecipeData((previous) => ({
            ...previous,
            [name]: val
        }));
    };


    // Submit edited recipe
    const onHandleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const formData = new FormData();

            formData.append(
                "title",
                recipeData.title
            );

            formData.append(
                "time",
                recipeData.time
            );

            /*
             * Backend expects ingredients as an array.
             * Convert the comma-separated input into JSON.
             */
            const ingredientsArray =
                typeof recipeData.ingredients === "string"
                    ? recipeData.ingredients
                        .split(",")
                        .map((ingredient) => ingredient.trim())
                        .filter(Boolean)
                    : recipeData.ingredients;

            formData.append(
                "ingredients",
                JSON.stringify(ingredientsArray)
            );

            formData.append(
                "instructions",
                recipeData.instructions
            );


            // Add image only if user selected a new one
            if (recipeData.file) {
                formData.append(
                    "file",
                    recipeData.file
                );
            }


            await axios.put(
                `${backendUrl}/recipe/${id}`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            // Update successful
            navigate("/myRecipe");

        } catch (err) {

            console.error(
                "Failed to update recipe:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update recipe. Please try again."
            );
        }
    };


    return (
        <div className="container">

            <form
                className="form"
                onSubmit={onHandleSubmit}
            >

                <div className="form-control">

                    <label htmlFor="title">
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        className="input"
                        name="title"
                        onChange={onHandleChange}
                        value={recipeData.title || ""}
                    />

                </div>


                <div className="form-control">

                    <label htmlFor="time">
                        Time
                    </label>

                    <input
                        id="time"
                        type="text"
                        className="input"
                        name="time"
                        onChange={onHandleChange}
                        value={recipeData.time || ""}
                    />

                </div>


                <div className="form-control">

                    <label htmlFor="ingredients">
                        Ingredients
                    </label>

                    <textarea
                        id="ingredients"
                        className="input-textarea"
                        name="ingredients"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.ingredients || ""}
                    />

                </div>


                <div className="form-control">

                    <label htmlFor="instructions">
                        Instructions
                    </label>

                    <textarea
                        id="instructions"
                        className="input-textarea"
                        name="instructions"
                        rows="5"
                        onChange={onHandleChange}
                        value={recipeData.instructions || ""}
                    />

                </div>


                <div className="form-control">

                    <label htmlFor="file">
                        Recipe Image
                    </label>

                    <input
                        id="file"
                        type="file"
                        className="input"
                        name="file"
                        onChange={onHandleChange}
                    />

                </div>


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <button type="submit">
                    Edit Recipe
                </button>

            </form>

        </div>
    );
}