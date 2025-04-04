// src/repositories/todo.repository.ts
import { IRepository } from "../../shared/interfaces/IRepository";
import { ITodo } from "../interfaces/todo.interface";
import { TodoModel } from "../models/todo.model";


export class TodoRepository implements IRepository<ITodo> {
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