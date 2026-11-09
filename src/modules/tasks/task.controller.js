import { TaskService } from "./task.service.js";
import { HttpResponses } from "../../utils/httpResponses.js";

const response = new HttpResponses();

export class TaskController {
    /**
     * Create task
     * @POST Method
     */
    static createTask = async (req, res, next) => {
        try {
            const task = await TaskService.create(req.body);

            response.success(res, 201, {
                success: true,
                data: task
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * List of all tasks
     * @GET Method
     */
    static getAllTasks = async (req, res, next) => {
        try {
            const tasks = await TaskService.list();

            response.success(res, 200, {
                success: true,
                data: tasks
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get task by id
     * @GET Method
     */
    static getTaskById = async (req, res, next) => {
        try {
            const task = await TaskService.getById(req.params.taskId);

            response.success(res, 200, {
                success: true,
                data: task
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update task by id
     * @PATCH Method
     */
    static updateTask = async (req, res, next) => {
        try {
            const task = await TaskService.update(req.params.taskId, req.body);

            response.success(res, 200, {
                success: true,
                data: task
            });
        } catch(error) {
            next(error);
        }
    }
}
