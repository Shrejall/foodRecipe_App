A full-stack MERN (MongoDB, Express, React, Node.js) web application where users can create, view, edit, delete, and favorite recipes.

The app supports image uploads, JWT-based authentication, and personalized recipe management.

🚀 Live Demo

🔗 Frontend: https://your-frontend-link.vercel.app

🔗 Backend API: https://your-backend-link.onrender.com


📌 Features

✅ User Authentication (JWT based login & register)
✅ Create, Read, Update, Delete (CRUD) Recipes
✅ Image Upload using Multer
✅ Protected Routes
✅ Favorite Recipes
✅ Responsive UI
✅ Secure API endpoints
✅ Personalized recipe dashboard

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Axios

Context API

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

Multer (Image Uploads)

JWT Authentication

dotenv

📂 Project Structure
Recipe_App/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/Recipe_App.git
cd Recipe_App

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend:

PORT=5000
CONNECTION_STRING=mongodb://localhost:27017/Recipe_App
JWT_SECRET=your_secret_key


Run backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

🔐 Authentication Flow

User registers/logs in

JWT token is generated

Token stored in localStorage

Protected routes validate token via middleware

User-specific recipes are fetched

🖼️ Image Upload Flow

User uploads image

Image stored in /public/images (backend)

<img width="1890" height="1010" alt="image" src="https://github.com/user-attachments/assets/e3193c5f-3646-4b24-93d1-4c78a67efa23" />
<img width="1865" height="981" alt="image" src="https://github.com/user-attachments/assets/e489da0e-74c9-4873-880b-6acd6c9b4266" />



Filename saved in MongoDB

Frontend renders image via static route
