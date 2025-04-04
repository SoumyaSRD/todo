import { Response } from "express";

// Define generic response types
interface SuccessResponse<T> {
    success: true;
    statusCode: number;
    message: string;
    data: T;
}

interface ErrorResponse<T> {
    success: false;
    statusCode: number;
    message: string;
    error?: any; // Optional detailed error object
}

/**
 * Sends a success response with dynamic data and status code
 * @param res Express Response object
 * @param message Custom success message
 * @param data Data to return (e.g., todo object or array)
 * @param statusCode HTTP status code (defaults to 200)
 */
export const successResponse = <T>(
    res: Response,
    message: string = "Request successful",
    data: T,
    statusCode: number = 200
): Response<SuccessResponse<T>> => {
    const response: SuccessResponse<T> = {
        success: true,
        statusCode,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

/**
 * Sends an error response with dynamic error details and status code
 * @param res Express Response object
 * @param message Custom error message
 * @param error Error object or details (optional)
 * @param statusCode HTTP status code (defaults based on error type)
 */
export const errorResponse = <T>(
    res: Response,
    message: string = "An error occurred",
    error: any = null,
    statusCode: number = 0
): Response<ErrorResponse<T>> => {
    console.error(`[ERROR] ${error?.message || error}`);

    // Determine status code and message based on error type
    statusCode = statusCode || error?.statusCode || 500;
    message = statusCode === 500 ? "Internal Server Error" : message || error?.message || "An error occurred";

    // Handle specific error cases
    if (error?.name === "ValidationError") {
        statusCode = 400;
        message = message || "Invalid Data Provided";
    } else if (error?.code === 11000) {
        statusCode = 400;
        message = message || "Duplicate Key Error";
    } else if (error?.message === "Todo not found") {
        statusCode = 404;
        message = message || "Resource not found";
    }

    const response: ErrorResponse<T> = {
        success: false,
        statusCode,
        message,
        error: error ? { name: error.name, message: error.message, stack: error.stack } : undefined,
    };

    return res.status(statusCode).json(response);
};

/**
 * Express Error Handling Middleware
 */
export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: Function
) => {
    console.error(`[ERROR] ${err.message || err}`);

    // Default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle specific error cases
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid Data Provided";
    } else if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate Key Error";
    } else if (err.message === "Todo not found") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: err.errors || err.message || null,
    });
    next();
};