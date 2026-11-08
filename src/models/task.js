import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Task description is required"],
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "high"
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo"
    },
    dueDate: {
        type: Date,
        required: [true, "Task Date is required"],
    }
},{
    timestamps: true
});

const Task = mongoose.model("TasK", taskSchema);

export default Task;