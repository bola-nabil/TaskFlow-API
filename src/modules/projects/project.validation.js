import { APPError } from "../../utils/appError.js";

export const createAndUpdateProjectValidation = (req, res, next) => {
    const { title, description, members } = req.body;

    if(!title || !description || !members) {
        return next(new APPError("Title, description and members required", 400));
    }

    if(typeof title !== "string") {
        return next(new APPError("Title is invalid", 400));
    }

    if(typeof description !== "string") {
        return next(new APPError("Description is invalid", 400));
    }

    if(members.length === 0) {
        return next(new APPError("Members required", 400));
    }

    const roles = members.map(member => member.role);

    if (!roles.every(role => ["user", "admin"].includes(role))) {
        return next(new APPError("One or more roles not valid", 400));
    }

    next();
}