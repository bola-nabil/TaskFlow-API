import { APPError} from "../../utils/appError.js";

export const registerValidation = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password) {
        return next(new APPError("Name, email and password are required", 400));
    }

    if(typeof name !== "string" || typeof email !== "string" 
       || typeof password !== "string") {
        return next(new APPError("Name, email or password are invalid", 400));
    }

    if(password.length < 8) {
        return next(new APPError("Password must be 8 chartactars at least", 400));
    }

    next();
}

export const loginValidation = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new APPError("Email and password required", 400));
    }

    if(typeof email !== "string" || typeof password !== "string") {
        return next(new APPError("Email or password invalid", 400));
    }

    next();
}

export const changePasswordValidation = (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if(!currentPassword || !newPassword || !confirmPassword) {
        return next(new APPError("Current, new and confirm password required", 400));
    }

    if(typeof currentPassword !== "string") {
        return next(new APPError("Current password invalid", 400));
    }

    if(typeof newPassword !== "string") {
        return next(new APPError("New password invalid", 400));
    }

    if(typeof confirmPassword !== "string") {
        return next(new APPError("Confirm password invalid", 400));
    }

    if(newPassword.length < 8) {
        return next(new APPError("Password must be 8 chartactars at least", 400));
    }

    if(newPassword !== confirmPassword) {
        return next(new APPError("Password not match", 400));
    }

    next();
}