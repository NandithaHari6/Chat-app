import { AppDataSource } from "./config/database";
import { User } from "./entities/user.entity";
import { AuthService } from "./modules/auth/auth.service";
import { AuthController } from "./modules/auth/auth.controller";
import { UserController } from "./modules/user/user.controller";
import { UserRepository } from "./modules/user/user.repository";
import { UserService } from "./modules/user/user.service";

export const createContainer = () => {

    const userOrmRepo = AppDataSource.getRepository(User);


    const userRepository = new UserRepository(userOrmRepo);

    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const authService = new AuthService(userService);
    const authController = new AuthController(authService);
    return { userController, authController };
}