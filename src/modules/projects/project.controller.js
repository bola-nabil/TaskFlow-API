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

    /**
     * Get projects accessible to me
     * @GET Method
     */
    static ownerProjects = async (req, res, next) => {
        try {
             const projects = await ProjectService.owner(req.user.userId);

             response.success(res, 200, {
                success: true,
                data: projects
             });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get project details by id
     * @GET Method
     */
    static projectByID = async (req, res, next) => {
        try {
            const project = await ProjectService.getById(req.params.projectId);

            response.success(res, 200, {
                success: true,
                data: project
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update project details by id
     * @PATCH Method
     */
    static updateProject = async (req, res, next) => {
        try {
            const project = await ProjectService.update(req.params.projectId, req.body);

            response.success(res, 200, {
                success: true,
                data: project
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Delete project by id
     * @DELETE Method
     */
    static deleteProject = async (req, res, next) => {
        try {
            await ProjectService.delete(req.params.projectId);

            response.success(res, 200, {
                success: true,
                message: "Your project deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Add a project member
     * @POST Method
     */
    static createMembers = async (req, res, next) => {
        try {
            const project = await ProjectService.createMembers(
                req.params.projectId,
                req.body,
                req.user.userId
            );

            response.success(res, 201, {
                success: true,
                data: project
            });
        } catch(error) {
            next(error);
        }
    }
}