/**
 * The above functions in TypeScript generate success and error responses with customizable messages, data, and status codes for an Express server.
 * @param {Response} res - The `res` parameter in the functions `successResponse` and `errorResponse` is an instance of the Express `Response` object. It is used to send a response back to the client making the HTTP request.
 * @param {string} message - The `message` parameter in the `successResponse` and `errorResponse` functions is a string that represents the message or description associated with the response being sent back to the client. It typically provides information about the outcome of the request or any relevant details that the client needs to know.
 * @param {T | null} [data=null] - The `data` parameter in the `successResponse` function is used to provide additional data to be included in the response. It is a generic type `<T>` which means it can be of any type. In the function signature, it is set to `T | null`, which means it can
 * @param {number} [statusCode=200] - The `statusCode` parameter in the `successResponse` and `errorResponse` functions is used to specify the HTTP status code that will be returned in the response. By default, the `statusCode` is set to `200` for success responses and `400` for error responses. However, you
 * @returns The `successResponse` and `errorResponse` functions are returning a response object with a specific structure based on the provided data.
 */
import { Response } from "express";
import { ErrorResponse, SuccessResponse } from "../interfaces/response.interface";

export const successResponse = <T>(
    res: Response,
    message: string,
    data: T | null = null,
    statusCode: number = 200
): Response<SuccessResponse<T>> => {
    const response: SuccessResponse<T> = { statusCode, message, data };
    return res.status(statusCode).json(response);
};

export const errorResponse = <T>(
    res: Response,
    message: string = '',
    error: any = null,
    statusCode: number = 0
): Response<ErrorResponse<T>> => {
    console.error(`[ERROR] ${error}`);

    // Set default status code and message
    statusCode = statusCode || error?.statusCode || 500;
    message = statusCode === 500 ? "Internal Server Error" : message || error?.message || "Internal Server Error";

    // MongoDB Validation Error Handling
    if (error?.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid Data Provided";
    }

    // MongoDB Duplicate Key Error
    if (error?.code === 11000) {
        statusCode = 400;
        message = "Duplicate Key Error";
    }
    const response: ErrorResponse<T> = { statusCode, message, error };

    return res.status(statusCode).json(response);
};



/**
 * Express Error Handling Middleware
 */
const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: Function
) => {
    console.error(`[ERROR] ${err.message}`);

    // Set default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // MongoDB Validation Error Handling
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid Data Provided";
    }

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate Key Error";
    }

    // Send JSON Response
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || null,
    });
    next()
};

export default errorMiddleware;
