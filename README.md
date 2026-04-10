# School Management Mini System

A Full Stack web application to manage basic school operations like students and tasks. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Features Implemented
- **Authentication**: Admin registration and login system with JWT. Only authenticated users can access the dashboard.
- **Student Management**: Add, Edit, Delete, and View list of students (including Roll Number and Class).
- **Task/Assignment Management**: Assign tasks/homework to students, mark tasks as completed, and view all assigned tasks with their status.
- **Dynamic Dashboard**: Beautiful UI with a responsive grid for viewing students and tasks side-by-side.
- **RESTful API**: Custom Express backend connecting to a MongoDB database to persist all data.

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (Running locally on default port 27017, or you can use a MongoDB Atlas URI)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a file named `.env` in the `backend` folder.
   - Copy the contents from `.env.example` into `.env`, or copy this:
     ```env
     PORT=5000
     MONGO_URI=mongodb://127.0.0.1:27017/school_management
     JWT_SECRET=super_secret_jwt_key
     ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(The server will run on http://localhost:5000)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend will run on http://localhost:5173 by default)*

## Using the Application
1. Visit the frontend URL (e.g. `http://localhost:5173/login`).
2. **First-time setup**: Click "Need an account? Register" on the login page to create an admin account.
3. Log in with your new admin credentials.
4. From the Dashboard, you can:
   - Click **Add Student** to create a student.
   - Click the **Book Icon** next to a student to assign them a task.
   - Click the **Check Icon** next to a task to mark it as completed.
   - Delete or edit students/tasks as needed.
