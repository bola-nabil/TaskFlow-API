import { APPError } from "../../utils/appError.js";

const checkRoles = (members, next) => {
    const roles = members.map(member => member.role);

    if (!roles.every(role => ["user", "admin"].includes(role))) {
        return next(new APPError("One or more roles not valid", 400));
    }
}

export const createAndUpdateProjectValidation = (req, res, next) => {
    const { title, description, members } = req.body;

    if(!title || !description) {
        return next(new APPError("Title, description required", 400));
    }

    if(typeof title !== "string") {
        return next(new APPError("Title is invalid", 400));
    }

    if(typeof description !== "string") {
        return next(new APPError("Description is invalid", 400));
    }

    const roles = members.map(member => member.role);

    if (!roles.every(role => ["user", "admin"].includes(role))) {
        return next(new APPError("One or more roles not valid", 400));
    }

    next();
}

export const createMembersValidation = (req, res, next) => {
    const { members } = req.body;

    if(!members) {
        return next(new APPError("Members is required", 400));
    }

    checkRoles(members, next);

    next();
}