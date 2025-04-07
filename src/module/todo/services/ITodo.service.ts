// src/interfaces/todo.service.interface.ts

import { IFilteredResponse } from "../../shared/interfaces/IFilteredResponse";
import { IFilterTodo, ITodo } from "../interfaces/todo.interface";


export interface ITodoService {
    createTodo(todo: ITodo): Promise<ITodo>;
    getTodos(): Promise<ITodo[]>;
    getTodoById(id: string): Promise<ITodo>;
    updateTodo(todo: Partial<ITodo>): Promise<ITodo>;
    deleteTodo(id: string): Promise<ITodo>;
    filterTodos(
        filterPayload: IFilterTodo
    ): Promise<IFilteredResponse<ITodo>>
}