import * as express from "express";
import AirplaneController from "../controllers/airplane.controller";

const airplaneController = AirplaneController.getInstance();
const airplaneRouter = express.Router();

airplaneRouter.get(
  "/",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const response = await airplaneController.get();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/fastest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const response = await airplaneController.getFastest();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/slowest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const response = await airplaneController.getSlowest();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

export default airplaneRouter;
