import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import projectRouter from "./modules/projects/project.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);

app.use(notFound);
app.use(errorMiddleware);

export default app;