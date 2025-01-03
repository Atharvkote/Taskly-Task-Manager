import express from "express";
import cors from "cors";
import { StatusSchema } from "../models/StatusSchema.js";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";

const router = express.Router();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

router.post("/update", async (req, res) => {
  try {
    const { data, username, id ,todo} = req.body;

    if (!data || !username || !id || !todo) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request data" });
    }

    const newData = new StatusSchema({
      id: id,
      username: username,
      todo:todo,
      status: data.status,
      starting_date: data.startDate,
      due_date: data.dueDate,
      priority: data.priority,
    });

    await newData.save();
    res.json({ success: true, newData });
  } catch (error) {
    console.error("Error in /update:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/fetchstatus", async (req, res) => {
  try {
    const status = await StatusSchema.find();
    res.json({ success: true, status });
  } catch (error) {
    console.error("error in /fetchstatus ", error);
  }
});

router.get("/fetchstatusOne", async (req, res) => {
  try {
    const { id, username } = req.query;
    const status = await StatusSchema.find({ id, username });
    res.json({ success: true, status });
  } catch (error) {
    console.error("error in /fetchstatus ", error);
  }
});

router.get("/fetchstatus", async (req, res) => {
  try {
    const { username } = req.query;
    const status = await StatusSchema.find({ username });
    res.json({ success: true, status });
  } catch (error) {
    console.error("error in /fetchstatus ", error);
  }
});

export default router;
