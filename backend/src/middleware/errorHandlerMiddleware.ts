import { AppError } from "../utils/appError";

export const errorHandler = (err: AppError, req: any, res: any, next: any) => {
    console.error(err);

    return res.status(err.statusCode).json({ message: err.message });
};