import express from 'express';

const app = express(); // Create an instance of the Express application

app.get("/", (req, res) => {
    res.send("Hello World!"); // Send a response when the root URL is accessed
});

app.listen(5000, () => {
    console.log("Server is running on port 5000"); // Log a message when the server starts
});