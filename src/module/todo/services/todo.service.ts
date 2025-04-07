import { IFilteredResponse } from "../../shared/interfaces/IFilteredResponse";
import { handleServiceError } from "../../shared/util/custom-error.util";
import { IFilterTodo, ITodo } from "../interfaces/todo.interface";
import { ITodoRepository } from "../repositories/ITodo.repository";
import { ITodoService } from "./ITodo.service";

export class TodoService implements ITodoService {
    private todoRepo: ITodoRepository;

    constructor(todoRepo: ITodoRepository) {
        this.todoRepo = todoRepo;
    }

    async createTodo(todo: ITodo): Promise<ITodo> {
        try {
            return await this.todoRepo.create(todo);
        } catch (error) {
            throw handleServiceError("create todo", error);
        }
    }

    async getTodos(): Promise<ITodo[]> {
        try {
            return await this.todoRepo.findAll();
        } catch (error) {
            throw handleServiceError("fetch todos", error);
        }
    }

    async getTodoById(id: string): Promise<ITodo> {
        try {
            const todo = await this.todoRepo.findById(id);
            if (!todo) throw new Error("Todo not found");
            return todo;
        } catch (error) {
            throw handleServiceError("retrieve todo", error);
        }
    }

    async updateTodo(todo: Partial<ITodo>): Promise<ITodo> {
        try {
            const updatedTodo = await this.todoRepo.update(todo?._id ? todo._id : '', todo);
            if (!updatedTodo) throw new Error("Todo not found");
            return updatedTodo;
        } catch (error) {
            throw handleServiceError("update todo", error);
        }
    }

    async deleteTodo(id: string): Promise<ITodo> {
        try {
            const deletedTodo = await this.todoRepo.delete(id);
            if (!deletedTodo) throw new Error("Todo not found");
            return deletedTodo;
        } catch (error) {
            throw handleServiceError("delete todo", error);
        }
    }

    async filterTodos(filterPayload: IFilterTodo): Promise<IFilteredResponse<ITodo>> {
        try {
            return await this.todoRepo.filterTodos(filterPayload);
        } catch (error) {
            throw handleServiceError("filter todos", error);
        }
    }
}
