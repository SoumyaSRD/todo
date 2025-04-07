// utils/errorHandler.ts
export const handleServiceError = (operation: string, error: unknown): never => {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to ${operation}: ${message}`);
};
