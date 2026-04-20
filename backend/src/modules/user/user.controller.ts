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
}