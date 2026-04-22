import { ChatParticipant } from "../../entities/chat-participant.entity";
import { Chat } from "../../entities/chat.entity";
import { ChatRepository } from "./chat.repository";
import { AppError } from "../../utils/appError";

export class ChatService{
    constructor(private chatRepository: ChatRepository) { }

    getMyChats = async (userId: number): Promise<Chat[]> => {
        try {
            return this.chatRepository.getChatsByUserId(userId);
        } catch (error) {
            throw new AppError("Failed to get chats", 500);
        }
    }

    getChatParticipants = async (chatId: number): Promise<Chat[]> => {
        try {
            return this.chatRepository.getGroupInfo(chatId);
        } catch (error) {
            throw new AppError("Failed to get chat participants", 500);
        }
    }
}