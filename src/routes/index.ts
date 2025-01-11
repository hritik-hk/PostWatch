import { Request, Response } from "express";
import { submit, metrics } from "../controllers/index.js";
import validateRequest from "../middlewares/validateRequest.js";

const WINDOW = 60; // in seconds
const ALLOWED_FAILED_REQUEST = 5;

// @ts-ignore
const router = (app): void => {
  app.post(
    "/api/submit",
    validateRequest(WINDOW, ALLOWED_FAILED_REQUEST),
    submit
  );

  app.get("/api/metrics", metrics);

  // Health check route
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("backend is working");
  });
};

export default router;
