import { IFilteredResponse } from "../../shared/interfaces/IFilteredResponse";
import { IRepository } from "../../shared/interfaces/IRepository";
import { IFilterTodo, ITodo } from "../interfaces/todo.interface";


export interface ITodoRepository extends IRepository<ITodo> {
    filterTodos(
        filterPayload: IFilterTodo
    ): Promise<IFilteredResponse<ITodo>>
}