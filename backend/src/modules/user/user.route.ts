import { UserController } from "./user.controller";
import express from "express";

export const createUserRoutes = (userController: UserController) => {    
    const router = express.Router();
    router.post("/", userController.createUser);
    return router;
}