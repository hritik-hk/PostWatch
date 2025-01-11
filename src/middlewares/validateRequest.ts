import { Response, Request, NextFunction } from "express";
import redisClient from "../configs/redis";
import sendMail from "../configs/mail";
import FailedRequest from "../models/failedRequest";
import { getDurationInHrsMinSec } from "../utils/common";
import { failedRequestType } from "../constants";

export default function validateRequestAndRateLimit(
  window: number,
  requestsAllowed: number
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get("x-access-token");

      if (!accessToken) {
        const ip = req.clientIp;

        const identifier = `failedRequest: ${ip}`;
        const req_count = await redisClient.incr(identifier);

        // save record into db
        const newFailedRequest = new FailedRequest({
          ip: ip,
          reason: failedRequestType.ACCESS_TOKEN_FAILURE,
        });

        await newFailedRequest.save();

        let try_after = 0;
        if (req_count === 1) {
          await redisClient.expire(identifier, window);
        } else {
          try_after = await redisClient.ttl(identifier);
        }

        if (req_count > requestsAllowed) {
          await sendMail();

          return res.status(429).json({
            msg: `your have exceed failed requests limits, try after ${getDurationInHrsMinSec(
              try_after
            )}`,
            error: "access token missing",
          });
        }
        return res.status(403).json({
          msg: "you're not authorized to access this",
          error: "access token missing",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log("rate limiter error: ", error);
      next(error);
    }
  };
}
