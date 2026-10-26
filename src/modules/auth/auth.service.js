import User from "../../models/user.model.js";
import { APPError } from "../../utils/appError.js";

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
}