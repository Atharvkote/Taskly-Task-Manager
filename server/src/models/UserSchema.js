import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password:{type: String, required: true},
  date: { type: String, required: true },
  time: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export const UserSchema = mongoose.model("User", userSchema);
