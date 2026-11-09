import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createAndUpdateTaskValidation  } from "./task.validation.js";
import { TaskController } from "./task.controller.js";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post("/", createAndUpdateTaskValidation, TaskController.createTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:taskId", TaskController.getTaskById);
taskRouter.patch("/:taskId", createAndUpdateTaskValidation, TaskController.updateTask);

export default taskRouter;