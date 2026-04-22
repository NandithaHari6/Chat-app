import { Repository } from "typeorm";
import { Chat } from "../../entities/chat.entity";
import { ChatParticipant } from "../../entities/chat-participant.entity";

export class ChatRepository{
    constructor(private chatRepository: Repository<Chat>) { }

    getChatsByUserId = async (userId: number): Promise<Chat[]> => {
        return this.chatRepository.find({
            where: {
                participants: {
                    user: { id: userId }
                }
            }
        });
    }

    getGroupInfo = async (chatId: number): Promise<Chat[]> => {
        return this.chatRepository.find({
            where: {
                id: chatId
            }
        });
    }
}