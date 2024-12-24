import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const Todo = new Schema({
    Id: String,
    todo:String,
    date: String,
    time: String,
    isCompleted: Boolean,
});

export const TodoSchema = mongoose.model('Todo', Todo);
