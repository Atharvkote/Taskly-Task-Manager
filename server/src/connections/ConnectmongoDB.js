import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// MongoDB Connection
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Todo-List");
    console.log("Connected to MongoDB Server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

export default app;
