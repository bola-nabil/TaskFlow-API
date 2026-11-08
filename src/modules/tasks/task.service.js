import Task from "../../models/task.js";

export class TaskService {
    static create = async (data) => {
        return await Task.create(data);
    }

    static list = async () => {
        return await Task.find()
                .populate("project")
                .populate("assignee", "name email");
    }
}