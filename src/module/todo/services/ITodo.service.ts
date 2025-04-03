// src/interfaces/todo.service.interface.ts

import { ITodo } from "../interfaces/todo.interface";


export interface ITodoService {
    createTodo(todo: ITodo): Promise<ITodo>;
    getTodos(): Promise<ITodo[]>;
    getTodoById(id: string): Promise<ITodo>;
    updateTodo(id: string, todo: Partial<ITodo>): Promise<ITodo>;
    deleteTodo(id: string): Promise<ITodo>;
}