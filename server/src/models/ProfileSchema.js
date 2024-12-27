import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true ,default:"No-name"},
  date: { type: String, required: true },
  time: { type: String, required: true },
  bio: { type: String, required: true ,default:"No Bio Added Yet..."},
});

export const ProfileSchema = mongoose.model("profile", profileSchema);
