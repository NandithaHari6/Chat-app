import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { UserService } from "../user/user.service";
import { AppError } from "../../utils/appError";
import { User } from "../../entities/user.entity";

export class AuthService {
    constructor(private userService: UserService) {
        this.googleClient = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );
    }
    private googleClient: OAuth2Client;



    getRedirectUrl = async (state: string): Promise<string> => {
        return this.googleClient.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
            state: state,
        });
    }


    /**
     * Handles the callback from Google, exchanges the code for tokens,
     * verifies the user, and generates an app session token.
     */
    handleGoogleCallback = async (code: string): Promise<{ user: User, token: string }> => {
        // 1. Exchange code for tokens
        const { tokens } = await this.googleClient.getToken(code);

        if (!tokens.id_token) {
            throw new AppError("No ID token returned from Google", 400);
        }

        // 2. Verify the ID token signature and get the payload
        const ticket = await this.googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email || !payload.name) {
            throw new Error("Invalid Google payload");
        }

        let userDetails: User | null = await this.userService.findUserByEmail(payload.email);

        if (!userDetails) {
            userDetails = await this.userService.createUser({
                email: payload.email,
                name: payload.name || payload.email.split("@")[0],
                displayPicture: payload.picture || undefined,
            });
        }
        // 4. Generate our application's JWT
        const appToken = jwt.sign(
            { userId: userDetails.id },
            process.env.JWT_SECRET || "default_secret_change_me",
            { expiresIn: "7d" }
        );

        return { user: userDetails, token: appToken };
    }
}

