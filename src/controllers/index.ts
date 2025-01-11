import { Request, Response } from "express";
import FailedRequest from "../models/failedRequest.js";
import { failedRequestType } from "../constants.js";
import { logger } from "../configs/winston.js";

const submit = async (req: Request, res: Response) => {
  return res.status(200).json({ msg: "response submitted successfully" });
};

const metrics = async (req: Request, res: Response) => {
  try {
    const result = await FailedRequest.find({});

    const failedRequestByEachIp = new Map<string, number>();
    const failureReasons = { accessTokenFailure: 0 };

    result.forEach((failedRequest) => {
      const ip = failedRequest.ip;
      const count = failedRequestByEachIp.get(ip as string) || 0;
      failedRequestByEachIp.set(ip as string, count + 1);

      if (failedRequest.reason === failedRequestType.ACCESS_TOKEN_FAILURE) {
        failureReasons.accessTokenFailure =
          failureReasons.accessTokenFailure + 1;
      }
    });

    const failuresByIP = [];
    for (let [key, value] of failedRequestByEachIp) {
      failuresByIP.push({ ip: key, failedAttempts: value });
    }

    const metrics = {
      totalFailedRequests: result.length,
      uniqueIPs: failedRequestByEachIp.size,
      failuresByIP,
      failureReasons,
    };
    return res.status(200).json({ message: "success", metrics });
  } catch (err) {
    logger.error("[GET api/metrics] something went wrong", err);
    return res
      .status(500)
      .json({ message: "failed", error: "internal server error" });
  }
};

export { submit, metrics };
