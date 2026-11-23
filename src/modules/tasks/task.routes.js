import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import
 { 
    createAndUpdateTaskValidation,
    updateStatusValidation,
    updateAssigneeValidation
} from "./task.validation.js";
import { TaskController } from "./task.controller.js";

const taskRouter = express.Router();

taskRouter.use(authMiddleware);

taskRouter.post("/", createAndUpdateTaskValidation, TaskController.createTask);
taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:taskId", TaskController.getTaskById);
taskRouter.patch("/:taskId", createAndUpdateTaskValidation, TaskController.updateTask);
taskRouter.delete("/:taskId", TaskController.deleteTask);
taskRouter.patch("/:taskId/status", updateStatusValidation, TaskController.editTaskStatus);
taskRouter.patch("/:taskId/assignee", updateAssigneeValidation, TaskController.updateAssignee);

export default taskRouter;