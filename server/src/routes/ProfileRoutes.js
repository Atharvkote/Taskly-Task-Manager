import express from "express";
import cors from "cors";
import { ProfileSchema } from "../models/ProfileSchema.js";
import bodyParser from "body-parser";

const router = express.Router();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Get Profile
// ...existing code...
router.get("/", async (req, res) => {
  try {
    const { username } = req.body; // Ensure it's from query params
    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }
    const trimmed_username = username.trim();
    console.log("Received username:", trimmed_username); // Check the received username

    const user = await ProfileSchema.findOne({ username: trimmed_username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// ...existing code...


// Edit Profile
router.post("/editprofile", async (req, res) => {
  try {
    const { username, name, bio } = req.body;

    if (!username || !name || !bio) {
      return res.status(400).json({
        success: false,
        message: "All fields (username, name, bio) are required",
      });
    }

    const user = await ProfileSchema.findOneAndUpdate(
      { username },
      { name, bio, updatedAt: new Date() }, // Include an update timestamp
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error in /editprofile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
