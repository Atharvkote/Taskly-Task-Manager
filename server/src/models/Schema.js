import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Ensure `id` is unique
  todo: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

export const TodoSchema = mongoose.model("Todo", todoSchema);
