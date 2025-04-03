import { Express } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { URL } from "../../../config/keys";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "API documentation for the Todo application",
        },
        servers: [{ url: URL, description: "Local server" }],
        components: {
            schemas: {
                Todo: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "660b793a7b41c2ab12345678" },
                        title: { type: "string", example: "Buy groceries" },
                        description: { type: "string", example: "Milk, Bread, and Eggs" },
                        completed: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time", example: "2024-03-30T12:34:56Z" },
                        updatedAt: { type: "string", format: "date-time", example: "2024-03-30T12:34:56Z" },
                    },
                },
            },
        },
    },
    apis: ["./src/**/*.ts"], // Include all TypeScript files in Swagger docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
