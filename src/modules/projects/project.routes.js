import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { ProjectController } from "./project.controller.js";
import { createProjectValidation } from "./project.validation.js";

const projectRouter = express.Router();

projectRouter.use(authMiddleware);

projectRouter.post("/", createProjectValidation, ProjectController.createProject);

export default projectRouter;