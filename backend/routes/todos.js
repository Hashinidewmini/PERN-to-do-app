import  { Router } from 'express'; //import this to create a new router object that we can use to define our routes for the todos resource.
import pool from '../db.js'; //to perform database operations using the connection pool that we set up in db.js.

const router = Router(); //to create a new router object that we can use to define our routes for the todos resource.

// Create a new todo
router.post("/", async(req, res) => {
    try{
        const { description, completed } = req.body; //to extract the description and completed from the request body.
        const newTodo = await pool.query( 
            //pool,query method to be able to talk to the db & execute a SQL query to insert a new todo into the database. 
            // The query uses parameterized queries to prevent SQL injection attacks. The $1 and $2 are placeholders for the values of description and completed
            // Returning * is used to return the newly created todo after insertion.(immediately send back to frontend)
            "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
            [description, completed || false] ); 
        res.json(newTodo.rows[0]); //to send the newly created todo back to the client as a JSON response. newTodo.rows[0] contains the first row of the result. 

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router; //to export the router object so that it can be imported and used in other parts of the application, 
                       // such as in the main server file (index.js) where we will use this router to handle requests related to todos.