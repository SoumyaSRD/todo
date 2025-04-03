import { ITodo } from "../interfaces/todo.interface";


export interface ITodoRepository {
    create(todo: ITodo): Promise<ITodo>;
    findAll(): Promise<ITodo[]>;
    findById(id: string): Promise<ITodo | null>;
    update(id: string, todo: Partial<ITodo>): Promise<ITodo | null>;
    delete(id: string): Promise<ITodo | null>;
}