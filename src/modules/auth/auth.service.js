import User from "../../models/user.model.js";
import { APPError } from "../../utils/appError.js";
import bcrypt from "bcrypt";

export class AuthService {
    static register = async (data) => {
        const { name, email, password, role } = data;

        const normilzeEmail = email.trim().toLowerCase();
        const existEmail = await User.findOne({
            email: normilzeEmail
        });

        if(existEmail) {
            throw new APPError("Email exits before", 409);
        }

        const user = await User.create({
            name: name.trim(),
            email: normilzeEmail,
            password,
            role: "user"
        });

        return user;
    }

    static login = async (data) => {
        const { email, password } = data;

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if(!user) {
            throw new APPError("Password or Email invalid", 401);
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            throw new APPError("Password or Email invalid", 401);
        }

        return user;
    }
}