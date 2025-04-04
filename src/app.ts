import cors from "cors";
import express from "express";
import DefaultRouter from "./app.routes";
import connectDB from "./config/dbconfig"; // Ensure default export in dbconfig.ts
import { setupSwagger } from "./config/swagger.config";

const app = express();

// Apply CORS Middleware with Proper Configuration
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend URL (e.g., "http://localhost:3000" for dev)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Enable if your app uses credentials; otherwise, remove this line
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
(async () => {
    await connectDB();
})();

// Setup Swagger API Docs
setupSwagger(app);

// Routes
app.use("/", DefaultRouter);

export default app;