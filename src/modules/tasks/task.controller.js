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
}
