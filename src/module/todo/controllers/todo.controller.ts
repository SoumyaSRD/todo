import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../shared/util/response.util";
import { ITodoService } from "../services/ITodo.service";

export class TodoController {
    private todoService: ITodoService;

    constructor(todoService: ITodoService) {
        this.todoService = todoService; // Require the service via constructor
    }

    /**
     * @swagger
     * /todo:
     *   post:
     *     summary: Create a new todo
     *     tags: [Todo]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Buy groceries"
     *               description:
     *                 type: string
     *                 example: "Milk, Bread, and Eggs"
     *               completed:
     *                 type: boolean
     *                 example: false
     *     responses:
     *       201:
     *         description: The created todo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 statusCode:
     *                   type: integer
     *                   example: 201
     *                 message:
     *                   type: string
     *                   example: "Todo created successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     completed:
     *                       type: boolean
     *       400:
     *         description: Bad request (e.g., invalid input)
     *       500:
     *         description: Internal server error
     */
    async createTodo(req: Request, res: Response): Promise<void> {
        try {
            const todo = await this.todoService.createTodo(req.body);
            successResponse(res, "Todo created successfully", todo, 201);
        } catch (error) {
            errorResponse(res, "Failed to create todo", error);
        }
    }

    /**
     * @swagger
     * /todo:
     *   get:
     *     summary: Get all todos
     *     tags: [Todo]
     *     responses:
     *       200:
     *         description: List of all todos
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 statusCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: "Todos retrieved successfully"
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                       title:
     *                         type: string
     *                       description:
     *                         type: string
     *                       completed:
     *                         type: boolean
     *       500:
     *         description: Internal server error
     */
    async getTodos(req: Request, res: Response): Promise<void> {
        try {
            const todos = await this.todoService.getTodos();
            successResponse(res, "Todos retrieved successfully", todos);
        } catch (error) {
            errorResponse(res, "Failed to retrieve todos", error);
        }
    }

    /**
     * @swagger
     * /todo/{id}:
     *   get:
     *     summary: Get a single todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The todo ID
     *     responses:
     *       200:
     *         description: The requested todo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 statusCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: "Todo retrieved successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     completed:
     *                       type: boolean
     *       404:
     *         description: Todo not found
     *       500:
     *         description: Internal server error
     */
    async getTodoById(req: Request, res: Response): Promise<void> {
        try {
            const todo = await this.todoService.getTodoById(req.params.id);
            successResponse(res, "Todo retrieved successfully", todo);
        } catch (error) {
            errorResponse(res, "Failed to retrieve todo", error);
        }
    }

    /**
     * @swagger
     * /todo/{id}:
     *   put:
     *     summary: Update a todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The todo ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Updated title"
     *               description:
     *                 type: string
     *                 example: "Updated description"
     *               completed:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       200:
     *         description: The updated todo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 statusCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: "Todo updated successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     completed:
     *                       type: boolean
     *       404:
     *         description: Todo not found
     *       400:
     *         description: Bad request (e.g., invalid input)
     *       500:
     *         description: Internal server error
     */
    async updateTodo(req: Request, res: Response): Promise<void> {
        try {
            const todo = await this.todoService.updateTodo(req.params.id, req.body);
            successResponse(res, "Todo updated successfully", todo);
        } catch (error) {
            errorResponse(res, "Failed to update todo", error);
        }
    }

    /**
     * @swagger
     * /todo/{id}:
     *   delete:
     *     summary: Delete a todo by ID
     *     tags: [Todo]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The todo ID
     *     responses:
     *       200:
     *         description: Todo deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 statusCode:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: "Todo deleted successfully"
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     title:
     *                       type: string
     *                     description:
     *                       type: string
     *                     completed:
     *                       type: boolean
     *       404:
     *         description: Todo not found
     *       500:
     *         description: Internal server error
     */
    async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const todo = await this.todoService.deleteTodo(req.params.id);
            successResponse(res, "Todo deleted successfully", todo);
        } catch (error) {
            errorResponse(res, "Failed to delete todo", error);
        }
    }
}