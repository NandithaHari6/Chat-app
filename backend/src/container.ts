import { AppDataSource } from "./config/database";
import { User } from "./entities/user.entity";
import { AuthService } from "./modules/auth/auth.service";
import { AuthController } from "./modules/auth/auth.controller";
import { UserController } from "./modules/user/user.controller";
import { UserRepository } from "./modules/user/user.repository";
import { UserService } from "./modules/user/user.service";
import { ChatRepository } from "./modules/chat/chat.repository";
import { ChatController } from "./modules/chat/chat.controller";
import { ChatService } from "./modules/chat/chat.service";
import { Chat } from "./entities/chat.entity";

export const createContainer = () => {

    const userOrmRepo = AppDataSource.getRepository(User);


    const userRepository = new UserRepository(userOrmRepo);

    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const authService = new AuthService(userService);
    const authController = new AuthController(authService);

    const chatOrmRepo = AppDataSource.getRepository(Chat);
    const chatRepository = new ChatRepository(chatOrmRepo);
    const chatService = new ChatService(chatRepository);
    const chatController = new ChatController(chatService);

    return { userController, authController, chatController };
}