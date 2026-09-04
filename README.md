# 🍳 RecipeHub – AI-Powered Recipe Sharing Platform

A full-stack **MERN** recipe-sharing application enhanced with **Google Gemini AI**. Users can discover recipes, create and manage their own recipes, upload images, save favorites, and use AI to turn available ingredients into practical recipes or find ingredient substitutes.

## 🚀 Live Demo

🔗 **Frontend:** https://foodrecipe-frontend-pxgo.onrender.com

🔗 **GitHub:** https://github.com/Shrejall/foodRecipe_App

## 📸 Screenshots

### 🏠 Home Page

<img src="./screenshots/home.png" width="900">

### 🍽️ Explore Recipes

<img src="./screenshots/recipes.png" width="900">

### 🤖 AI Recipe Generator & Ingredient Substitution

<img src="./screenshots/ai-features.png" width="700">

### 📖 Recipe Details

<img src="./screenshots/recipe-details.png" width="700">

### 📝 Recipe Instructions

<img src="./screenshots/recipe-instructions.png" width="700">

## ✨ Features

### 👤 User & Recipe Management

* User registration and login with **JWT authentication**
* Create, read, update, and delete recipes
* Personalized recipe management
* Favorite and unfavorite recipes
* Protected API routes
* Responsive user interface

### 🤖 AI-Powered Features

* **Recipe Generation:** Enter multiple ingredients you have available and Gemini generates a practical recipe with a title, ingredient list, step-by-step instructions, and estimated cooking time.
* **Ingredient Substitution:** Enter an ingredient and Gemini suggests **3–4 practical substitutes**, including replacement amounts and a short explanation of why each substitute works.
* AI responses are requested in a structured **JSON format**, making them easy for the frontend to consume.
* Temporary Gemini service failures are handled with retry logic and incremental delays.

### 🖼️ Image Uploads

* Upload recipe images using **Multer**
* Images are stored on the backend and served through a static route
* Image filenames are associated with recipes in MongoDB

## 🧠 AI Integration Flow

```text
User enters ingredients / ingredient
            ↓
      React Frontend
            ↓
      Express AI Route
            ↓
      AI Controller
            ↓
       AI Service
            ↓
      Google Gemini API
            ↓
  Structured JSON Response
            ↓
      React Frontend
```

The backend exposes two AI endpoints:

```http
POST /ai/generate-recipe
POST /ai/substitute
```

The AI layer is implemented in `backend/services/aiService.js`, while request handling is separated into the AI controller and routes. Your backend registers these endpoints under `/ai`.

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Context API
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* dotenv
* CORS

### AI

* **Google Gemini API**
* `@google/genai` SDK

## 📂 Project Structure

```text
foodRecipe_App/
│
├── backend/
│   ├── config/
│   ├── controller/
│   │   ├── ai.js
│   │   ├── recipe.js
│   │   └── user.js
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   │   └── ai.js
│   ├── services/
│   │   └── aiService.js
│   ├── public/
│   │   └── images/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   └── ...
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shrejall/foodRecipe_App.git
cd foodRecipe_App
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=5000
CONNECTION_STRING=mongodb://localhost:27017/Recipe_App
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal and install the frontend dependencies according to the frontend project's package configuration.

Then start the frontend development server:

```bash
npm run dev
```

The development frontend is typically available at:

```text
http://localhost:5173
```

The backend is typically available at:

```text
http://localhost:5000
```

## 🔐 Authentication Flow

```text
User registers / logs in
        ↓
JWT token generated
        ↓
Token stored in localStorage
        ↓
Protected requests include token
        ↓
Backend middleware validates token
        ↓
User-specific data is returned
```

## 🤖 AI API Examples

### Generate a recipe from ingredients

```http
POST /ai/generate-recipe
Content-Type: application/json
```

```json
{
  "ingredients": "potato, onion, tomato, cumin"
}
```

Example response shape:

```json
{
  "title": "Spiced Potato Curry",
  "ingredients": [
    "2 potatoes",
    "1 onion",
    "2 tomatoes",
    "1 tsp cumin"
  ],
  "steps": [
    "Chop the vegetables.",
    "Heat oil and add cumin.",
    "Cook the onion and tomatoes.",
    "Add potatoes and cook until tender."
  ],
  "time": "30 minutes"
}
```

### Find ingredient substitutes

```http
POST /ai/substitute
Content-Type: application/json
```

```json
{
  "ingredient": "butter"
}
```

The response contains the original ingredient and a list of suggested substitutes with replacement amounts and reasons.

## 🖼️ Image Upload Flow

```text
User selects recipe image
        ↓
Multer processes upload
        ↓
Image stored in backend/public/images
        ↓
Filename saved with recipe data
        ↓
Frontend loads image through /images/<filename>
```

## 📌 Why This Project?

RecipeHub combines a traditional **full-stack CRUD application** with practical **Generative AI features**. It demonstrates authentication, REST API development, database integration, file uploads, and AI-powered structured responses in one application.

## 🔮 Future Improvements

* AI-powered personalized recipe recommendations
* Nutrition and calorie estimation
* Dietary preference support
* Recipe difficulty and preparation-time filters
* Streaming AI responses for a more interactive experience

---

Made with ❤️ using **MERN + Gemini AI**
