export interface CustomResponse {
    statusCode: number;
    message: string;
}

export interface SuccessResponse<T> extends CustomResponse {
    data?: T | null;
}

export interface ErrorResponse<T> extends CustomResponse {
    error?: T | null;
}
