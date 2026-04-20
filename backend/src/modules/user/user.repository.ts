import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";

export type CreateUserInput = {
    email: string;
    name: string;
    bio?: string;
    displayPicture?: string;
};

export class UserRepository {
    constructor(private readonly userRepository: Repository<User>) { }

    createUser = async (user: CreateUserInput): Promise<User> => {
        const newUser = new User();
        newUser.email = user.email;
        newUser.name = user.name;
        return this.userRepository.save(newUser);
    }

    findUserByEmail = async (email: string): Promise<User | null> => {
        return this.userRepository.findOne({ where: { email } });
    }

    findUserById = async (id: number): Promise<User | null> => {
        return this.userRepository.findOne({ where: { id } });
    }

    updateUser = async (id: number, user: User): Promise<User> => {
        return this.userRepository.save({ ...user, id });
    }

    deleteUser = async (id: number): Promise<void> => {
        await this.userRepository.delete(id);
    }
}

