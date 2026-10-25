import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

const app = express();

app.use(express.json());

app.use(notFound);
app.use(errorMiddleware);

export default app;