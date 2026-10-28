import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { ProjectController } from "./project.controller.js";
import { createAndUpdateProjectValidation } from "./project.validation.js";

const projectRouter = express.Router();

projectRouter.use(authMiddleware);

projectRouter.post("/", createAndUpdateProjectValidation, ProjectController.createProject);
projectRouter.get("/", ProjectController.ownerProjects);
projectRouter.get("/:projectId", ProjectController.projectByID);
projectRouter.patch(
    "/:projectId",
    createAndUpdateProjectValidation, ProjectController.updateProject
);
projectRouter.delete("/:projectId", ProjectController.deleteProject);

export default projectRouter;