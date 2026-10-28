import Project from "../../models/project.model.js";
import User from "../../models/user.model.js";
import { APPError } from "../../utils/appError.js";

export class ProjectService {
    static create = async (data, id) => {
        const { title, description, members } = data;
        const { userId } = id;

        const memberIds = members.map(member => member.user);

        const existingUsers = await User.find({
            _id: { $in: memberIds }
        }).select("_id");

        if (existingUsers.length !== memberIds.length) {
            throw new APPError("One or more users not found", 404);
        }

        return await Project.create({
            title,
            description,
            owner: userId,
            members
        });
    }

    static owner = async (id) => {
        return await Project.find({
            owner: id
        }).populate("members.user", "name email");
    }

    static getById = async (id) => {
        const project = await Project.findById(id)
                                .populate("members.user", "name email");

        if(!project) {
            throw new APPError("Project not found", 404);
        }

        return project;
    }
}