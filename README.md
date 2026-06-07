# PERN To-Do App

A full-stack To-Do application built with the **PERN stack**: PostgreSQL, Express.js, React, and Node.js.

The application allows users to create, view, update, mark as completed, and delete todo items.

---

## Features

* Create new todos
* View all todos
* Update todo descriptions
* Mark todos as completed or incomplete
* Delete todos
* Store todos in PostgreSQL
* RESTful API backend
* React frontend with Vite
* Environment-based configuration

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* PostgreSQL
* pg
* CORS
* dotenv
* Nodemon

### Database

* PostgreSQL

---

## Project Structure

```txt
to-do-app-PERN/
│
├── backend/
│   ├── database.sql
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── routes/
│       └── todos.js
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Prerequisites

Before running this project, make sure you have the following installed:

* Node.js
* npm
* PostgreSQL
* Git

Check installed versions:

```bash
node -v
npm -v
psql --version
git --version
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Hashinidewmini/PERN-to-do-app.git
```

Navigate into the project folder:

```bash
cd to-do-app-PERN
```

---

## Database Setup

Open PostgreSQL and create a database:

```sql
CREATE DATABASE tododb;
```

Connect to the database:

```sql
\c tododb;
```

Create the `todo` table:

```sql
CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
```

You can also find the database script in:

```txt
backend/database.sql
```

Optional sample data:

```sql
INSERT INTO todo (description, completed)
VALUES
('Learn PostgreSQL', false),
('Build a PERN stack app', false),
('Practice full-stack development', true);
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```txt
backend/.env
```

Add the following environment variables:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
```

Start the backend development server:

```bash
npm run dev
```

The backend server will run on:

```txt
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` folder:

```txt
frontend/.env
```

Add the backend API URL:

```env
VITE_API_URL=http://localhost:5000/api/todos
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will usually run on:

```txt
http://localhost:5173
```

---

## API Endpoints

Base URL:

```txt
http://localhost:5000/api/todos
```

### Get All Todos

```http
GET /api/todos
```

Response example:

```json
[
  {
    "todo_id": 1,
    "description": "Learn PERN stack",
    "completed": false
  }
]
```

---

### Create Todo

```http
POST /api/todos
```

Request body:

```json
{
  "description": "Complete PERN project",
  "completed": false
}
```

Response example:

```json
{
  "todo_id": 2,
  "description": "Complete PERN project",
  "completed": false
}
```

---

### Update Todo

```http
PUT /api/todos/:id
```

Request body:

```json
{
  "description": "Complete and polish PERN project",
  "completed": true
}
```

Response example:

```json
{
  "message": "Todo updated successfully",
  "todo": {
    "todo_id": 2,
    "description": "Complete and polish PERN project",
    "completed": true
  }
}
```

---

### Delete Todo

```http
DELETE /api/todos/:id
```

Response example:

```json
{
  "message": "Todo deleted successfully"
}
```

---

## Environment Variables

### Backend Environment Variables

| Variable      | Description         | Example         |
| ------------- | ------------------- | --------------- |
| `PORT`        | Backend server port | `5000`          |
| `DB_USER`     | PostgreSQL username | `postgres`      |
| `DB_PASSWORD` | PostgreSQL password | `your_password` |
| `DB_HOST`     | Database host       | `localhost`     |
| `DB_PORT`     | PostgreSQL port     | `5432`          |
| `DB_NAME`     | Database name       | `tododb`        |

### Frontend Environment Variables

| Variable       | Description     | Example                           |
| -------------- | --------------- | --------------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api/todos` |

---

## Available Scripts

### Backend Scripts

Navigate to the backend folder before running these commands:

```bash
cd backend
```

Start the backend in development mode:

```bash
npm run dev
```

Start the backend in production mode:

```bash
npm start
```

---

### Frontend Scripts

Navigate to the frontend folder before running these commands:

```bash
cd frontend
```

Start the frontend development server:

```bash
npm run dev
```

Build the frontend for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

## Author

**Hashini Fernando**

---

## License

This project is licensed under the ISC License.
