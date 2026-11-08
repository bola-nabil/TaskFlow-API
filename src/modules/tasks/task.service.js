import Task from "../../models/task.js";

export class TaskService {
    static create = async (data) => {
        return await Task.create(data);
    }
}