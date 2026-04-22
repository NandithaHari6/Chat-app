import { ChatController } from "./chat.controller";
import express from "express";
export const createChatRoutes = (chatController: ChatController) => {
    const router = express.Router();

    router.get("/:chatId/participants", chatController.getChatParticipants);
    router.get("/me/chats", chatController.getMyChats);
    return router;
}   