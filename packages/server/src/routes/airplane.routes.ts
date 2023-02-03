import * as express from "express";
import AirplaneController from "../controllers/airplane.controller";

const airplaneController = AirplaneController.getInstance();
const airplaneRouter = express.Router();

airplaneRouter.get(
  "/role",
  async (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const response = await airplaneController.findAllUnique("role");
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
      const { page, take } = req.query;
      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "maximumSpeed",
        false
      );
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
      const { page, take } = req.query;

      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "maximumSpeed",
        true
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/heaviest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { page, take } = req.query;

      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "emptyWeight",
        false
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/lightest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { page, take } = req.query;

      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "emptyWeight",
        true
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/shortest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { page, take } = req.query;

      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "length",
        true
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

airplaneRouter.get(
  "/longest",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { page, take } = req.query;

      const response = await airplaneController.findAndRank(
        {
          page: Number(page),
          take: Number(take),
        },
        "length",
        false
      );

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

export default airplaneRouter;
