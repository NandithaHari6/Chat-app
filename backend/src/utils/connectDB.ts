import { AppDataSource } from "../config/database";
import { Express } from "express";

export async function connectDB(app: Express) {
    try {
      await AppDataSource.initialize();
      console.log("✅ DB connected");
  
      app.listen(4000, () => {
        console.log("🚀 Server running");
      });
    } catch (err) {
      console.error("❌ Failed to start", err);
    }
  }