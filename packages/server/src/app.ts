import express from "express";
import airplaneRouter from "./routes/airplane.routes";

const app = express();
app.use(express.json());
app.use("/v1/airplanes", airplaneRouter);

export default app;
