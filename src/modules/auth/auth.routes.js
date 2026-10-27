import express from "express";
import { 
 registerValidation,
 loginValidation,
 changePasswordValidation
}
from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, AuthController.register);
authRouter.post("/login", loginValidation, AuthController.login);
authRouter.patch(
    "/change-password",
    authMiddleware, changePasswordValidation, AuthController.changePassword
);

export default authRouter;