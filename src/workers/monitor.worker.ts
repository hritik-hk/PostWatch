import "dotenv/config";
import { Worker } from "bullmq";
import redisConn from "../configs/redis.js";
import FailedRequest from "../models/failedRequest.js";

//@ts-ignore
const trackFailedRequest = async (requestData) => {
  const ip = requestData.ip;
  const reason = requestData.reason;

  const newFailedRequest = new FailedRequest({
    ip,
    reason,
  });

  await newFailedRequest.save();
};

try {
  const monitorWorker = new Worker(
    "monitor-processing-queue",
    trackFailedRequest,
    {
      connection: redisConn,
    }
  );
  console.log("monitor worker starting...");
} catch (error) {
  console.log("error occurred in monitor worker: ", error);
  process.exit(1);
}
