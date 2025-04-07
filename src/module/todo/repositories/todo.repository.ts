// src/repositories/todo.repository.ts
import { IFilteredResponse } from "../../shared/interfaces/IFilteredResponse";
import { IFilterTodo, ITodo } from "../interfaces/todo.interface";
import { TodoModel } from "../models/todo.model";
import { ITodoRepository } from "./ITodo.repository";

export class TodoRepository implements ITodoRepository {
    async create(todo: ITodo): Promise<ITodo> {
        const newTodo = new TodoModel(todo);
        return await newTodo.save();
    }

    async findAll(): Promise<ITodo[]> {
        return await TodoModel.find().sort({ updatedAt: -1 }).exec();
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

    async filterTodos(
        filterPayload: IFilterTodo = { page: 1, limit: 10 }
    ): Promise<IFilteredResponse<ITodo>> {
        const { page = 1, limit = 10, completed, title } = filterPayload;

        // Calculate how many documents to skip for pagination
        const skip = (page - 1) * limit;

        // Construct MongoDB match criteria
        const match: Record<string, any> = {};

        // Add title regex filter (case-insensitive)
        if (title) {
            match["title"] = { $regex: new RegExp(title, "i") };
        }

        // Add completed filter only if it's not undefined/null
        if (completed !== null && completed !== undefined) {
            match["completed"] = completed;
        }

        // MongoDB aggregation with pagination and total count
        const result = await TodoModel.aggregate([
            { $match: match },
            {
                $facet: {
                    data: [
                        { $sort: { updatedAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                    totalCount: [{ $count: "count" }],
                },
            },
        ]).exec();

        const total = result[0]?.totalCount[0]?.count || 0;

        return {
            todos: result[0]?.data || [],
            total,
            page,
            pages: Math.ceil(total / limit),
        };
    }
}
