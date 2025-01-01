import express from "express";
import cors from "cors";
import { UserSchema } from "../models/UserSchema.js";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";


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
router.post("/jwt", async (req, res) => {
  const {given_name,email,sub} = req.body;
  const user = await UserSchema.findOne({ email });
  if(!user){
    try{
        const user = new UserSchema({
            username : given_name,
            email:email,
            password: sub,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString(),
            isAdmin: false,
        });
        await user.save();
        res.json({success:true,username:user.username,email:user.email});
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
    }else{
        res.json({success:true,username:user.username,email:user.email});
    }
});

export default router;
