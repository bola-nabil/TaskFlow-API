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

    static createMembers = async (id, data, userId) => {
        const { members } = data;

        const project = await Project.findById(id);

        if (!project) {
            throw new APPError("Project not found", 404);
        }

        if (project.owner.toString() !== userId.toString()) {
            throw new APPError("You don't have permission", 403);
        }

        if (!Array.isArray(members) || members.length === 0) {
            throw new APPError("Members must be a non-empty array", 400);
        }

        await existingUsers(members);

        const existingMemberIds = new Set(
            project.members.map(member => member.user.toString())
        );

        const hasDuplicate = members.some(member =>
            existingMemberIds.has(member.user.toString())
        );

        if (hasDuplicate) {
            throw new APPError("One or more users are already members", 400);
        }

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                $push: {
                    members: { $each: members }
                }
            },
            {
                returnDocument: "after",
                runValidators: true
            }
        ).populate("members.user", "name email");

        return updatedProject;
    };
}