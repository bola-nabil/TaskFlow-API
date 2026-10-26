import { APPError } from "../utils/appError.js"

export const authorizeMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user) {
            return next(new APPError("Authentication token is required", 401));
        }

        if(!allowedRoles.includes(req.user.role)) {
            return next(new APPError("You'r not have premission", 403));
        }

        next();
    }
}