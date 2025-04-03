import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { TodoRepository } from "../repositories/todo.repository";
import { TodoService } from "../services/todo.service";

const TodoRoutes: Router = Router();
console.log("TODO Routes Initialized");

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

TodoRoutes.post("", todoController.createTodo.bind(todoController));
TodoRoutes.get("", todoController.getTodos.bind(todoController));
TodoRoutes.get("/:id", todoController.getTodoById.bind(todoController));
TodoRoutes.put("/:id", todoController.updateTodo.bind(todoController));
TodoRoutes.delete("/:id", todoController.deleteTodo.bind(todoController));

export default TodoRoutes;