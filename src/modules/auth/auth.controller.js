import { AuthService } from "./auth.service.js";
import { HttpResponses } from "../../utils/httpResponses.js";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

const response = new HttpResponses();

export class AuthController {
    /**
     * Register
     * @POST Method
     */
    static register = async (req, res, next) => {
        try {
            const user = await AuthService.register(req.body);

            response.success(res, 201, {
                success: true,
                message: "You're register successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Login
     * @POST Method
     */
    static login = async (req, res, next) => {
        try {
            const user = await AuthService.login(req.body);

            const token = jwt.sign(
                { userId: user._id.toString(), role: user.role },
                env.jwt_secret,
                { expiresIn: "1h"}
            );

            response.success(res, 200, {
                success: true,
                message: "You're login successfully",
                token,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Change Password
     * @PATCH
     */
    static changePassword = async (req, res, next) => {
        try {
            await AuthService.changePassowrd(req.body, req.user);

            response.success(res, 200, {
                success: true,
                message: "Password changed successfully"
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Show my profile
     * @GET
     */
    static showProfile = async (req, res, next) => {
        try {
            const profile = await AuthService.show(req.user);

            response.success(res, 200, {
                success: "message",
                data: profile
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update profile details
     * @PATCH Method
     */
    static updateProfile = async (req, res, next) => {
        try {
            const profile = await AuthService.update(req.user, req.body);

            response.success(res, 200, {
                success: true,
                data: profile
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Delete profile
     * @DELETE Method
     */
    static deleteProfile = async (req, res, next) => {
        try {
            await AuthService.delete(req.user);

            response.success(res, 200, {
                success: true,
                message: "Your profile deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }
}