const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const generateRecipe = async (ingredients) => {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3.6-flash",

                contents: `
You are an expert cooking assistant.

Create a practical recipe using the ingredients provided by the user.

Requirements:
- Use the user's ingredients as the main ingredients.
- You may include common supporting ingredients such as salt, oil, spices, etc.
- The recipe should be realistic and suitable for home cooking.
- Give clear, numbered cooking steps.
- Each cooking step must be a separate item in the steps array.
- Estimate a reasonable total cooking time.
- Do not combine multiple steps into one string.

User ingredients:
${ingredients}
                `,

                config: {
                    responseMimeType: "application/json",

                    responseSchema: {
                        type: "object",

                        properties: {
                            title: {
                                type: "string",
                                description: "Name of the recipe"
                            },

                            ingredients: {
                                type: "array",
                                items: {
                                    type: "string"
                                },
                                description:
                                    "List of ingredients with quantities where appropriate"
                            },

                            steps: {
                                type: "array",
                                items: {
                                    type: "string"
                                },
                                description:
                                    "Individual step-by-step cooking instructions. Each step must be a separate array item."
                            },

                            time: {
                                type: "string",
                                description:
                                    "Estimated total cooking time"
                            }
                        },

                        required: [
                            "title",
                            "ingredients",
                            "steps",
                            "time"
                        ]
                    }
                }
            });

            return JSON.parse(response.text.trim());

        } catch (error) {

            console.error(
                `Gemini API Error (attempt ${attempt}/${maxRetries}):`,
                error.message
            );

            // Retry only temporary service errors
            if (error.status === 503 && attempt < maxRetries) {
                await sleep(2000 * attempt);
                continue;
            }

            throw new Error("Failed to generate recipe");
        }
    }
};

// Find substitutes for a single ingredient
const substituteIngredient = async (ingredient) => {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-3.6-flash",

                contents: `
You are an expert cooking assistant.

Suggest practical substitutes for the following ingredient:

Ingredient:
${ingredient}

Requirements:
- Suggest 3 to 4 commonly available substitutes.
- Prefer substitutes that work in a wide range of home-cooking recipes.
- For each substitute, provide a recommended replacement amount.
- Briefly explain why the substitute works.
- Consider taste, texture, and cooking behavior.
- Do not suggest dangerous, unusual, or non-food alternatives.
`,

                config: {
                    responseMimeType: "application/json",

                    responseSchema: {
                        type: "object",

                        properties: {
                            ingredient: {
                                type: "string",
                                description: "The original ingredient"
                            },

                            substitutes: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: {
                                            type: "string",
                                            description: "Name of the substitute"
                                        },

                                        amount: {
                                            type: "string",
                                            description: "Recommended replacement amount"
                                        },

                                        reason: {
                                            type: "string",
                                            description:
                                                "Short explanation of why this substitute works"
                                        }
                                    },

                                    required: [
                                        "name",
                                        "amount",
                                        "reason"
                                    ],

                                    propertyOrdering: [
                                        "name",
                                        "amount",
                                        "reason"
                                    ]
                                }
                            }
                        },

                        required: [
                            "ingredient",
                            "substitutes"
                        ],

                        propertyOrdering: [
                            "ingredient",
                            "substitutes"
                        ]
                    }
                }
            });

            return JSON.parse(response.text.trim());

        } catch (error) {

            console.error(
                `Gemini Substitution Error (attempt ${attempt}/${maxRetries}):`,
                error.message
            );

            // Retry only temporary service errors
            if (error.status === 503 && attempt < maxRetries) {
                await sleep(2000 * attempt);
                continue;
            }

            throw new Error("Failed to find ingredient substitutes");
        }
    }
};


module.exports = {
    generateRecipe,
    substituteIngredient
};