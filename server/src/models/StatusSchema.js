import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Ensure `id` is unique
  username: { type: String, required: true }, // Ensure `username` is unique
  todo: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  starting_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  updatedAt: { type: Date }, // Added updatedAt field
});

export const StatusSchema = mongoose.model("status", statusSchema);
