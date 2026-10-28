import Project from "../../models/project.model.js";
import User from "../../models/user.model.js";
import { APPError } from "../../utils/appError.js";


export const existingUsers = async (members) => {
    const memberIds = members.map(member => member.user);

    const users = await User.find({
        _id: { $in: memberIds }
    }).select("_id");

    if (users.length !== new Set(memberIds.map(String)).size) {
        throw new APPError("One or more users not found", 404);
    }
};

export class ProjectService {
    static create = async (data, id) => {
        const { title, description, members } = data;
        const { userId } = id;

       if (members !== undefined) {
            await existingUsers(members);
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

    static update = async (id, data) => {
        const { title, description, members } = data;

       if (members !== undefined) {
            await existingUsers(members);
       }

        const project = await Project.findByIdAndUpdate(
            id,
            {
                title,
                description,
                members
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        ).populate("members.user", "name email");

        if(!project) {
            throw new APPError("Project not found", 404);
        }

        return project;
    }

    static delete = async (id) => {
        const project = await Project.findByIdAndDelete(id);

        if(!project) {
            throw new APPError("Project not found", 404);
        }

        return project;
    }
}