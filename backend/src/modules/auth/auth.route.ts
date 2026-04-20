import { Router } from "express";
import { AuthController } from "./auth.controller";

export const generateAuthRoutes = (authController: AuthController) => {
    const router = Router();
    router.get("/google/login", authController.getGoogleLoginUrl);
    router.get("/google/callback", authController.handleGoogleCallback);
    router.post("/logout", authController.logout);
    return router;
}