import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";

export class UserController {
    constructor(private userService: UserService) { }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    getMe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId!;
            const profile = await this.userService.getProfile(userId);
            res.json(profile);
        } catch (error) {
            next(error);
        }
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = parseInt(String(req.params.userId), 10);
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid userId" });
            }
            const profile = await this.userService.getPublicProfile(userId);
            res.json(profile);
        } catch (error) {
            next(error);
        }
    }

    
}
