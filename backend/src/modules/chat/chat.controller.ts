import { ChatService } from "./chat.service";
import { Request, Response } from "express";
import { NextFunction } from "express";
export class ChatController {
    constructor(private chatService: ChatService) { }

    getMyChats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId!;
            const chats = await this.chatService.getMyChats(userId);
            res.status(200).json({ chats: chats });
        } catch (error) {
            next(error);
        }
    }

    getChatParticipants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const chatId = req.params.chatId[0];
            const participants = await this.chatService.getChatParticipants(parseInt(chatId));
            res.status(200).json({ participants: participants });
        } catch (error) {
            next(error);
        }
    }
}