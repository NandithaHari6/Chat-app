import { User } from "../../entities/user.entity";
import { Chat } from "../../entities/chat.entity";
import { AppError } from "../../utils/appError";
import { CreateUserInput, UserRepository } from "./user.repository";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    createUser = async (user: CreateUserInput): Promise<User> => {
        const userCreated = await this.userRepository.createUser(user);
        if (!userCreated) {
            throw new AppError("Failed to create user", 500);
        }
        return userCreated;
    }

    findUserByEmail = async (email: string): Promise<User | null> => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new AppError("User with this email not found", 404);
        }
        return user;
    }

    findUserById = async (id: number): Promise<User | null> => {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new AppError("User with this id not found", 404);
        }
        return user;
    }

    updateUser = async (id: number, user: Partial<User>): Promise<User> => {
        const userToUpdate = await this.findUserById(id);
        if (!userToUpdate) {
            throw new AppError("User with this id not found", 404);
        }
        if (user.name) {
            userToUpdate.name = user.name;
        }
        if (user.bio) {
            userToUpdate.bio = user.bio;
        }
        if (user.displayPicture) {
            userToUpdate.displayPicture = user.displayPicture;
        }
        return this.userRepository.updateUser(id, userToUpdate);
    }

    getProfile = async (userId: number): Promise<Pick<User, "id" | "name" | "email" | "bio" | "displayPicture">> => {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            displayPicture: user.displayPicture,
        };
    }
    getAllUsers = async (): Promise<User[]> => {
        return this.userRepository.findAllUsers();
    }

    getPublicProfile = async (userId: number): Promise<Pick<User, "id" | "name" | "bio" | "displayPicture">> => {
        const user = await this.userRepository.findUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return {
            id: user.id,
            name: user.name,
            bio: user.bio,
            displayPicture: user.displayPicture,
        };
    }

   
}

