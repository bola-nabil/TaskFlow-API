import Task from "../../models/task.js";
import { APPError } from "../../utils/appError.js";

export class TaskService {
    static create = async (data) => {
        return await Task.create(data);
    }

    static list = async () => {
        return await Task.find()
                .populate("project")
                .populate("assignee", "name email");
    }

    static getById = async (id) => {
        const task = await Task.findById(id)
                        .populate("project")
                        .populate("assignee", "name email");

        if(!task) {
            throw new APPError("Task not found", 404);
        }

        return task;
    }

    static update = async (id, data) => {
        const task = await Task.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: "after",
                runValidators: true
            }
        ).populate("project")
         .populate("assignee", "name email");


        if(!task) {
            throw new APPError("Task not found", 404);
        }

        return task;
    }
}