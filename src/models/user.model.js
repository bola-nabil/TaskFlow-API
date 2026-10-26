import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
{
    timestamps: true
});

userSchema.pre("save", async function () {
    if(!this.isModified("password")) {
        return;
    }
    
    this.password = await bcrypt(this.password, 12);
});

const User = mongoose.model("User", userSchema);

export default User;