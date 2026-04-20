import { Request, Response } from "express";
import crypto from "crypto";
import { AuthService } from "./auth.service";

export class AuthController {
    constructor(private authService: AuthService) { }
    /**
     * GET /api/auth/google/login
     * Generates a secure state, sets it in a cookie, and returns the Google OAuth URL.
     */
    getGoogleLoginUrl = async (_req: Request, res: Response) => {
        try {
            // Generate a random state string for CSRF protection
            const state = crypto.randomBytes(32).toString("hex");

            // Store the state in a short-lived, HttpOnly cookie
            res.cookie("oauth_state", state, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 10 * 60 * 1000, // 10 minutes
            });

            // Get the URL from the service
            const url =  await this.authService.getRedirectUrl(state);

            // Option B: Return the URL to the frontend so it can redirect
            res.json({ url });
        } catch (error) {
            console.error("Error generating Google URL:", error);
            res.status(500).json({ error: "Failed to generate login URL" });
        }
    };

    /**
     * GET /api/auth/google/callback
     * Handles the redirect back from Google, verifies state, exchanges code, and sets session cookie.
     */
    handleGoogleCallback = async (req: Request, res: Response) => {
        try {
            const { code, state } = req.query;
            const cookieState = req.cookies?.oauth_state;

            // 1. Verify CSRF state
            if (!state || !cookieState || state !== cookieState) {
                return res.status(403).json({ error: "CSRF validation failed" });
            }

            // Clear the state cookie as it's no longer needed
            res.clearCookie("oauth_state");

            if (!code || typeof code !== "string") {
                return res.status(400).json({ error: "Missing authorization code" });
            }

            // 2. Delegate to service to handle the Google exchange and user creation
            const { user, token } = await this.authService.handleGoogleCallback(code);

            // 3. Set the application session cookie
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            // 4. Redirect the user to the frontend application (e.g., the chat dashboard)
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            res.redirect(`${frontendUrl}/chat`);
            
        } catch (error) {
            console.error("Error in Google callback:", error);
            // Redirect to a frontend error page
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            res.redirect(`${frontendUrl}/login?error=auth_failed`);
        }
    };
    
    /**
     * POST /api/auth/logout
     * Clears the authentication cookie.
     */
    logout = (req: Request, res: Response) => {
        res.clearCookie("auth_token");
        res.json({ message: "Logged out successfully" });
    };
}

