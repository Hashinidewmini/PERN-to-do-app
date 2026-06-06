import  { Router } from 'express'; //import this to create a new router object that we can use to define our routes for the todos resource.
import pool from '../db.js'; //to perform database operations using the connection pool that we set up in db.js.

const router = Router(); //to create a new router object that we can use to define our routes for the todos resource.

// Create a new todo
router.post("/", async (req, res) => {
    try {
      const { description, completed } = req.body;
  
      if (!description || description.trim() === "") {
        return res.status(400).json({
          message: "Todo description is required"
        });
      }
  
      const newTodo = await pool.query(
        "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
        [description.trim(), completed ?? false]
      );
  
      res.status(201).json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
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
      const { id } = req.params;
      const { description, completed } = req.body;
  
      if (!description || description.trim() === "") {
        return res.status(400).json({
          message: "Todo description is required"
        });
      }
  
      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
        [description.trim(), completed ?? false, id]
      );
  
      if (updatedTodo.rows.length === 0) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }
  
      res.json({
        message: "Todo updated successfully",
        todo: updatedTodo.rows[0]
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  });


//Delete a todo
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
        [id]
      );
  
      if (deletedTodo.rows.length === 0) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }
  
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  });


export default router; //to export the router object so that it can be imported and used in other parts of the application, 
                       // such as in the main server file (index.js) where we will use this router to handle requests related to todos.