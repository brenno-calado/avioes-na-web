import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import airplaneRouter from "./routes/airplane.routes";

const app = express();
app.use(express.json());
app.use("/v1/airplanes", airplaneRouter);
app.use(errorMiddleware);

export default app;
