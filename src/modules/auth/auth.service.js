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

    static changePassowrd = async (data, id) => {
        const { currentPassword, newPassword } = data;
        const { userId } = id;

        const user = await User.findById(userId);

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

        if(!isPasswordCorrect) {
            throw new APPError("Your password is incorrect", 400);
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        const updatePassword = await User.findByIdAndUpdate(
            userId,
            {
                password: hashedNewPassword
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        return updatePassword;
    }

    static show = async (id) => {
        const { userId } = id;

        return await User.findById(userId).select("name email");
    }

    static update = async (id, data) => {
        const { userId } = id;
        const { name, email } = data;

        return await await User.findByIdAndUpdate(
            userId,
            {
                name,
                email
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        ).select("name email");
    }

    static delete = async (id) => {
        const { userId } = id;

        return await User.findByIdAndDelete(userId);
    }
}