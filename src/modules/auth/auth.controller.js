import { AuthService } from "./auth.service.js";
import { HttpResponses } from "../../utils/httpResponses.js";

const response = new HttpResponses();

export class AuthController {
    /**
     * Register
     * @POST Method
     */
    static register = async (req, res, next) => {
        try {
            const user = await AuthService.register(req.body);

            response.success(res, 201, {
                success: true,
                message: "You're register successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                }
            });
        } catch(error) {
            next(error);
        }
    }
}