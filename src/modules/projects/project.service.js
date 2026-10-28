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
}