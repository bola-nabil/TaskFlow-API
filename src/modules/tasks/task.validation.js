import { APPError } from "../../utils/appError.js";

export const createTaskValidation = (req, res, next) => {
    const {
        title,
        description,
        project,
        assignee,
        priority,
        status,
        dueDate 
    } = req.body;

    if(!title) {
        return next(new APPError("Title is required", 400));
    }

    if(typeof title !== "string") {
        return next(new APPError("Title should be string", 400));
    }

    if(!description) {
        return next(new APPError("Description is required", 400));
    }

    if(typeof description !== "string") {
        return next(new APPError("Description should be string", 400));
    }

    if(!project) {
        return next(new APPError("Project is required", 400));
    }

    if(!assignee) {
        return next(new APPError("Assignee is required", 400));
    }

    if(!priority) {
        return next(new APPError("Priority is required", 400));
    }

    if(priority !== "high" && priority !== "medium" && priority !== "low") {
        return next(new APPError("Priority not valid choosed", 400));
    }

    if(!status) {
        return next(APPError("Status is required", 400));
    }

    if(status !== "todo" && status !== "inprogress" && status !== "done") {
        return next(new APPError("Status not valid choosed", 400));
    }

    if(!dueDate) {
        return next(new APPError("Task date is required", 400));
    }

    next();
}