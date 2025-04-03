import cors from "cors";
import express from "express";
import connectDB from "./config/dbconfig"; // Ensure default export in dbconfig.ts
import DefaultRouter from "./routes/default.route"; // Ensure DefaultRouter is a Router

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
(async () => {
    await connectDB();
})();

// Routes
app.use("/", DefaultRouter); // ✅ Use `use()` for routers

export default app;
