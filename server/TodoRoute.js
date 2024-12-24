import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { TodoSchema } from "./src/models/Schema.js";
import bodyParser from "body-parser";
import fs from "fs/promises";

const app = express();
const port = 3000;

// MongoDB Connection
await mongoose
  .connect("mongodb://127.0.0.1:27017/Todo-List", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Server"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Create a new todo - POST Request
app.post("/", async (req, res) => {
  const { id, todo, date, time, isCompleted } = req.body;

  // Check if all fields are provided
  if (!id || !todo || !date || !time || isCompleted === undefined) {
    return res.status(400).send("All fields (id, todo, date, time, isCompleted) are required.");
  }

  try {
    const newTodo = new TodoSchema({
      id,
      todo,
      date,
      time,
      isCompleted,
    });

    await newTodo.save();
    console.log("Saving Todo............");
    await fs.appendFile("./src/logs/TodoLogs.txt", `Todo saved successfully: ${newTodo}\n`, { flag: "a" });
    console.log("Append Logs............");
    res.status(201).send("Todo saved successfully");
  } catch (error) {
    res.status(500).send(`Error saving todo: ${error.message}`);
  }
});


// Get all todos - GET Request
app.get("/", async (req, res) => {
  try {
    const todos = await TodoSchema.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(`Error fetching todos: ${error.message}`);
  }
});

// Delete a todo - DELETE Request
app.delete("/", async (req, res) => {
  try {
    const { Id } = req.body;
    await TodoSchema.deleteOne({ id: Id });
    res.send("Todo deleted successfully");
  } catch (error) {
    res.status(500).send(`Error deleting todo: ${error.message}`);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
