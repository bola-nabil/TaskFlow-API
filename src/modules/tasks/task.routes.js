import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createTaskValidation  } from "./task.validation.js";
import { TaskController } from "./task.controller.js";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post("/", createTaskValidation, TaskController.createTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:taskId", TaskController.getTaskById);

export default taskRouter;