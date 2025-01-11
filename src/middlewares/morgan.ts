import morgan from "morgan";
import { Request, Response } from "express";
import { stream } from "../configs/winston.js";
import moment from "moment";

const morganFormat = (tokens: any, req: Request, res: Response) => {
  const date = moment().format();
  const host = req.headers["host"] || "-";
  const accept = req.headers["accept"] || "-";
  const authorization = req.headers["authorization"] || "-";
  const origin = req.headers["origin"] || "-";
  const referer = req.headers["referer"] || "-";
  const httpVersion = req.httpVersion || "-";
  const userAgent = req.headers["user-agent"] || "-";

  return [
    `[${date}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    `HTTP/${httpVersion}`,
    `[STATUS:${tokens.status(req, res)}]`,
    host,
    `[ACCEPT: ${accept}]`,
    authorization,
    origin,
    referer,
    userAgent,
  ].join(" ");
};

const morganMiddleware = morgan(morganFormat, {
  stream: stream,
});

export default morganMiddleware;