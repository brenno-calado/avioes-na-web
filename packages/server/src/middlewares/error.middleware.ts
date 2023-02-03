import * as express from "express";

export const errorMiddleware = (
  err: Error,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  console.error(req.headers);
  return res.status(400).json({ message: err.message });
};
