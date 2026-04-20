import express from "express";
import dotenv from "dotenv";
import { generateAuthRoutes } from "./modules/auth/auth.route";
import { createContainer } from "./container";
import { createUserRoutes } from "./modules/user/user.route";
dotenv.config();
const app = express();
const { authController, userController } = createContainer();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", generateAuthRoutes(authController));
app.use("/api/users", createUserRoutes(userController));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});