import express from "express";
import cors from "cors";
import { UserSchema } from "../models/UserSchema.js";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";


const router = express.Router();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Log file path
const logFilePath = path.resolve("./logs/TodoLogs.txt");

// Ensure logs directory exists
await fs.mkdir(path.dirname(logFilePath), { recursive: true });

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if ( !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Find user by username and email
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Log the login attempt
    const logFilePath = "./path-to-your-log-file.txt"; // Update with your log file path
    await fs.appendFile(
      logFilePath,
      `:: Logged In :: ${new Date().toDateString()} :: ${new Date().toLocaleTimeString()} :: user : ${JSON.stringify({
        username: user.username,
        email: user.email,
      })}\n`
    );

    // Respond with success
    res.json({ success: true, user: { username: user.username, email: user.email } });
    // res.redirect("/");
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required",
      });
    }

    const existingUser = await UserSchema.findOne({ username, email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
        history: true,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({
      username,
      email,
      password: hashedPassword,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      isAdmin: false,
      email_verifed:false,
      isOAuth:false,
    });

    await user.save();

    // Log successful signup
    await fs.appendFile(
      logFilePath,
      `:: Signed Up :: ${new Date().toDateString()} :: ${new Date().toLocaleTimeString()} :: user: ${JSON.stringify({
        username: user.username,
        email: user.email,
      })}\n`
    );

    res.status(201).json({ success: true, user: { username: user.username, email: user.email }, history: false });
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});




export default router;
