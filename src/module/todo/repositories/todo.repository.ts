// src/repositories/todo.repository.ts
import mongoose, { Model, Schema } from "mongoose";
import { ITodo } from "../interfaces/todo.interface";
import { ITodoRepository } from "./ITodo.repository";

const todoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
});

const TodoModel: Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema);

export class TodoRepository implements ITodoRepository {
    async create(todo: ITodo): Promise<ITodo> {
        const newTodo = new TodoModel(todo);
        return await newTodo.save();
    }

    async findAll(): Promise<ITodo[]> {
        return await TodoModel.find().exec();
    }

    async findById(id: string): Promise<ITodo | null> {
        return await TodoModel.findById(id).exec();
    }

    async update(id: string, todo: Partial<ITodo>): Promise<ITodo | null> {
        return await TodoModel.findByIdAndUpdate(id, todo, { new: true }).exec();
    }

    async delete(id: string): Promise<ITodo | null> {
        return await TodoModel.findByIdAndDelete(id).exec();
    }
}