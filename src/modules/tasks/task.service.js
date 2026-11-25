import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";
import { APPError } from "../../utils/appError.js";
import { pagination } from "../../utils/pagination.js";

export class TaskService {
    static create = async (data) => {
        return await Task.create(data);
    }

    static list = async (req) => {

        const { page, limit, skip } = pagination(req);
        return await Task.find()
                .populate("project")
                .populate("assignee", "name email")
                .limit(limit).skip(skip);
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

    static delete = async (id) => {
         const task = await Task.findByIdAndDelete(id);

         if(!task) {
            throw new APPError("Task not found", 404);
         }

         return task;
    }

    static editStatus = async (id, status) => {
        const task = await Task.findByIdAndUpdate(
            id,
            status,
            {
                runValidators: true,
                returnDocument: "after"
            }
        ).populate("project")
         .populate("assignee", "name email");;

        if(!task) {
            throw new APPError("Task not found", 404);
        }

        return task;
    }

    static updateAssignee = async (id, assignee) => {

        const user = await User.findById(assignee._id);

        if(!user) {
            throw new APPError("User not found", 404);
        }
        const task = await Task.findByIdAndUpdate(
            id,
            assignee,
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