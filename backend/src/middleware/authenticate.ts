import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.auth_token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "default_secret_change_me"
        ) as JwtPayload;

        req.userId = decoded.userId;
        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
};
