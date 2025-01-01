import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true, default: "No-name" },
  date: { type: String, required: true },
  time: { type: Date, required: true }, // Changed to Date
  bio: { type: String, required: true, default: "No Bio Added Yet..." },
  updatedAt: { type: Date }, // Added updatedAt field
});


export const ProfileSchema = mongoose.model("profiles", profileSchema);
