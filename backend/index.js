import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos.js'; // Import the todo routes from the specified file

const app = express(); // Create an instance of the Express application

app.use(cors()); // Enable CORS for all routes to allow cross-origin requests
app.use(express.json()); // Middleware to parse incoming JSON requests and puts the parsed data in req.body

app.use("/todos", todoRoutes); // Use the imported todo routes for any requests that start with /todos. 
                               // This means that any request to /todos will be handled by the routes defined in the todos.js file.


                               

app.listen(5000, () => {
    console.log("Server is running on port 5000"); // Log a message when the server starts
});