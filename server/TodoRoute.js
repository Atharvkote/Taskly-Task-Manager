import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { TodoSchema } from "./src/models/Schema.js";
import bodyParser from "body-parser";
import fs from "fs/promises";
import UserRouter from './src/routes/UserRoutes.js'
import ProfileRouter from './src/routes/ProfileRoutes.js'
import OAuthRouter from './src/routes/OAuthsRoutes.js'
import StatusRouter from './src/routes/StatusRoutes.js';

const app = express();
const port = 3000;

// MongoDB Connection
await mongoose
  .connect("mongodb://127.0.0.1:27017/Todo-List", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Server"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/profile",ProfileRouter);
app.use("/user",UserRouter);
app.use("/oauth",OAuthRouter);
app.use("/status",StatusRouter);

// Routes
// Create a new todo - POST Request
app.post("/", async (req, res) => {
  const { username,Id, todo, date, time, isCompleted } = req.body;

  // Validate all fields
  if (!username || !Id || !todo || !date || !time || isCompleted === undefined) {
    return res
      .status(400)
      .send("All fields (Id, todo, date, time, isCompleted) are required.");
  }

  try {
    const newTodo = new TodoSchema({
      id: Id, // Adjusted to match frontend field name
      username,
      todo,
      date,
      time,
      isCompleted,
    });

    await newTodo.save();
    await fs.appendFile(
      "./src/logs/TodoLogs.txt",
      `:: New Todo :: ${date} :: ${time} :: Todo saved successfully: ${newTodo}\n`,
      { flag: "a" }
    );

    res.status(201).send("Todo saved successfully");
  } catch (error) {
    res.status(500).send(`Error saving todo: ${error.message}`);
  }
});

// Get all todos - GET Request
app.get("/", async (req, res) => {
  const username = req.query.username;
  // console.log(username);
  try {
    const todos = await TodoSchema.find({username:username});
    res.send(todos);
  } catch (error) {
    res.status(500).send(`Error fetching todos: ${error.message}`);
  }
});

app.delete("/", async (req, res) => {
  // console.log(req.body);
  const { username,Id } = req.body; // Extract Id from the request body

  if (!username || !Id) {
    console.log("Todo Id is required");
    return res.status(400).send("Todo Id is required");
  }

  try {
    // Use Id to query the schema's id field
    const deletedTodo = await TodoSchema.findOneAndDelete({ username:username,id:Id });

    if (!deletedTodo) {
      console.log("Todo Id is required");
      return res.status(404).send("Todo not found");
    }

    await fs.appendFile(
      "./src/logs/TodoLogs.txt",
      `:: Delete Todo :: ${new Date().toDateString()} :: ${new Date().toLocaleTimeString()} :: Deleted Todo: ${JSON.stringify(
        deletedTodo
      )}\n`,
      { flag: "a" }
    );

    res.status(200).send("Todo deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error deleting todo: ${error.message}`);
  }
});

app.post("/edit", async (req, res) => {
  const { username,Id, newTodo } = req.body; // Extract Id and newTodo from the request body

  if (!username || !Id || !newTodo) {
    return res.status(400).send("Id and newTodo are required");
  }

  try {
    const todo = await TodoSchema.findOne({ id: Id,username:username });

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    todo.todo = newTodo;  // Update the todo value
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).send(`Error editing todo: ${error.message}`);
  }
});



app.post("/check", async (req, res) => {
  const { Id,username } = req.body; // Extract Id from the request body

  if (!Id) {
    return res.status(400).send("Id are required");
  }

  try {
    const todo = await TodoSchema.findOne({ id: Id,username:username });

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).send(`Error editing todo: ${error.message}`);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

app.get("/logout", async (req, res) => {
  try {
    res.redirect('/');
  } catch (error) {
    console.error("Error in /logout:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
