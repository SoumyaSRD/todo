import { ITodo } from "../interfaces/todo.interface";
import { TodoRepository } from "../repositories/todo.repository";
import { ITodoService } from "./ITodo.service";

export class TodoService implements ITodoService {
    private todoRepo: TodoRepository;

    constructor(todoRepo?: TodoRepository) {
        this.todoRepo = todoRepo || new TodoRepository();
    }

    async createTodo(todo: ITodo): Promise<ITodo> {
        try {
            return await this.todoRepo.create(todo);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            throw new Error(`Failed to create todo: ${errorMessage}`);
        }
    }

    async getTodos(): Promise<ITodo[]> {
        try {
            return await this.todoRepo.findAll();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            throw new Error(`Failed to fetch todos: ${errorMessage}`);
        }
    }

    async getTodoById(id: string): Promise<ITodo> {
        try {
            const todo = await this.todoRepo.findById(id);
            if (!todo) throw new Error("Todo not found");
            return todo;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            throw new Error(`Failed to retrieve todo: ${errorMessage}`);
        }
    }

    async updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo> {
        try {
            const updatedTodo = await this.todoRepo.update(id, todo);
            if (!updatedTodo) throw new Error("Todo not found");
            return updatedTodo;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            throw new Error(`Failed to update todo: ${errorMessage}`);
        }
    }

    async deleteTodo(id: string): Promise<ITodo> {
        try {
            const deletedTodo = await this.todoRepo.delete(id);
            if (!deletedTodo) throw new Error("Todo not found");
            return deletedTodo;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            throw new Error(`Failed to delete todo: ${errorMessage}`);
        }
    }
}