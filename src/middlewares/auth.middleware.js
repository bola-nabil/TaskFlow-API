import { APPError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")) {
        return next(new APPError("Authentication token is required", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, env.jwt_secret);

        req.user = {
            userId: decode.userId,
            role: decode.role
        }

        return next();
    } catch(error) {
        return next(new APPError("Expried or Invalid Token", 401));
    }

}