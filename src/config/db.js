import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(env.db_url);
        console.log("DB connected successfully");
    } catch(error) {
        throw Error(error.message);
    }
}

export default connectDB;