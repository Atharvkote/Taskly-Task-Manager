import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Todo-List")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Todo Schema and Model
const todoSchema = new mongoose.Schema({
  id: String,
  todo: String,
  date: String,
  time: String,
  isCompleted: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    const todo = new Todo({
      id: "1",
      todo: "test",
      date: "test",
      time: "test",
      isCompleted: false,
    });
    await todo.save();
    console.log("Todo saved successfully");
  } catch (error) {
    res.status(500).send(`Error saving todo: ${error.message}`);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`);
});
