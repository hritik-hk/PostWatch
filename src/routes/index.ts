import { Request, Response } from "express";

// @ts-ignore
const router = (app): void => {
  // Health check route
  app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("backend is working");
  });
};

export default router;
