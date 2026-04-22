import { UserController } from "./user.controller";
import express from "express";
import { authenticate } from "../../middleware/authenticate";

export const createUserRoutes = (userController: UserController) => {    
    const router = express.Router();
    router.post("/", userController.createUser);
    router.get("/me", authenticate, userController.getMe);
    router.get("/:userId", authenticate, userController.getUserById);
    router.get("/", authenticate, userController.getAllUsers);
    return router;
}