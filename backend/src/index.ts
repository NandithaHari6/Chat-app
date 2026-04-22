import express from "express";
import dotenv from "dotenv";
import { generateAuthRoutes } from "./modules/auth/auth.route";
import { createContainer } from "./container";
import { createUserRoutes } from "./modules/user/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/connectDB";
import { createChatRoutes } from "./modules/chat/chat.route";

dotenv.config();
const app = express();
const { authController, userController, chatController } = createContainer();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", generateAuthRoutes(authController));
app.use("/api/users", createUserRoutes(userController));
app.use("/api/chats", createChatRoutes(chatController));
connectDB(app);