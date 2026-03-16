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


// Get all todos
router.get("/", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo"); //to execute a SQL query to select all todos from the database.
        res.json(allTodos.rows); //to send the retrieved todos back to the client as a JSON response. allTodos.rows contains an array of all the todos.
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// Update a todo
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params; //to extract the id of the todo to be updated from the request parameters.
        const { description, completed } = req.body; //to extract the new description and completed status from the request body.
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
            [description, completed || false, id] //to execute a SQL query to update the specified todo in the database. The RETURNING * clause is used to return the updated todo after the update operation.
            // $1, $2, and $3 are placeholders for the values of description, completed, and id, respectively. This helps prevent SQL injection attacks.
        );

        res.json({
            message: "Todo updated successfully",
            todo: updatedTodo.rows[0]
        }); //to send the updated todo back to the client as a JSON response. updatedTodo.rows[0] contains the first row of the result, which is the updated todo.
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


//Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; //to extract the id of the todo to be deleted from the request parameters.
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]); //to execute a SQL query to delete the specified todo from the database. The $1 is a placeholder for the value of id, which helps prevent SQL injection attacks.
        res.json({ message: "Todo deleted successfully" }); //to send a JSON response back to the client indicating that the todo was deleted successfully.
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


export default router; //to export the router object so that it can be imported and used in other parts of the application, 
                       // such as in the main server file (index.js) where we will use this router to handle requests related to todos.