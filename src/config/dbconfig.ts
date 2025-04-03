import mongoose from "mongoose";
import { MONGO_URI } from "./keys"; // Ensure keys.ts exports MONGO_URI

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "todoDB", // Optional: Specify database name
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB; // ✅ Correct ES module export
