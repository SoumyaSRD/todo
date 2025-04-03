import mongoose, { Document, Schema } from "mongoose";
import { ITodo } from "../interfaces/todo.interface";


const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    desciption: { type: String },
    completed: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)

export const TodoModel = mongoose.model<ITodo & Document>("Todo", TodoSchema);
