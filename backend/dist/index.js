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
dotenv_1.default.config();
const app = (0, express_1.default)();
const { authController, userController } = (0, container_1.createContainer)();
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", (0, auth_route_1.generateAuthRoutes)(authController));
app.use("/api/users", (0, user_route_1.createUserRoutes)(userController));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map