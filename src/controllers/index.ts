import { Request, Response } from "express";

const submit = (req: Request, res: Response) => {
  return res.status(200).json({ msg: "response submitted successfully" });
};

export { submit };
