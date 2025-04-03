import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI: string = process.env.MONGO_URI || "";
export const PORT: string = process.env.PORT || "5000";
export const URL: string = process.env.URL || "http://localhost:5000/"
