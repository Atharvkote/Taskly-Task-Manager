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
    const { username } = req.query; // Only fetch the username from query params

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }
    // console.log(username);

    const user = await ProfileSchema.findOne({ username });

    if (!user) {
      return res.json({ success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ...existing code...

// Edit Profile
router.post("/editprofile", async (req, res) => {
  try {
    // console.log(req.body);
    const { username,name, bio } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "All fields (username) are required",
      });
    }
    if (!name ) {
      return res.status(400).json({
        success: false,
        message: "All fields (name) are required",
      });
    }
    if (!bio) {
      return res.status(400).json({
        success: false,
        message: "All fields ( bio) are required",
      });
    }

    const user = await ProfileSchema.findOneAndUpdate(
      { username },
      {
        name,
        bio,
        updatedAt: new Date(), // Set updatedAt field
        time: new Date(), // Set time to current date/time
      },
      // { new: true }
    );

    if (!user) {
      const NEWuser = await ProfileSchema.create({
        username: username,
        name: name,
        bio: bio,
        date: new Date(), // Use new Date() to get the current date/time
        updatedAt: new Date(), // Set updatedAt field to current date/time
        time: new Date(), // Set time to current date/time
    });
       await NEWuser.save();
       res.json({ success: true, NEWuser });
    }

    // res.json({ success: true, user });
  
  } catch (error) {
    console.error("Error in /editprofile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
