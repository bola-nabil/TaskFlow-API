import { ProjectService } from "./project.service.js";
import { HttpResponses } from "../../utils/httpResponses.js";

const response = new HttpResponses();

export class ProjectController {
    /**
     * Create project
     * @POST Method
     */
    static createProject = async (req, res, next) => {
        try {
            const project = await ProjectService.create(req.body, req.user);

            response.success(res, 201, {
                success: true,
                data: project
            });
        } catch(error) {
            next(error);
        }
    }
}