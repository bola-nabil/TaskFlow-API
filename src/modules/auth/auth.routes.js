import express from "express";
import { registerValidation, loginValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, AuthController.register);
authRouter.post("/login", loginValidation, AuthController.login);

export default authRouter;