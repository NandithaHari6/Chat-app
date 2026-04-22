"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = require("./modules/auth/auth.route");
const container_1 = require("./container");
const user_route_1 = require("./modules/user/user.route");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDB_1 = require("./utils/connectDB");
const chat_route_1 = require("./modules/chat/chat.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
const { authController, userController, chatController } = (0, container_1.createContainer)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", (0, auth_route_1.generateAuthRoutes)(authController));
app.use("/api/users", (0, user_route_1.createUserRoutes)(userController));
app.use("/api/chats", (0, chat_route_1.createChatRoutes)(chatController));
(0, connectDB_1.connectDB)(app);
//# sourceMappingURL=index.js.map