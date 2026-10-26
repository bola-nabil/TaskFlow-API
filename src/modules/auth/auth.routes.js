import express from "express";
import { registerValidation } from "./auth.validation.js";
import { AuthController } from "./auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidation, AuthController.register);

export default authRouter;