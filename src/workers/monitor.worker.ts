import "dotenv/config";
import { Worker } from "bullmq";
import redisConn from "../configs/redis.js";
import FailedRequest from "../models/failedRequest.js";
import connectToDB from "../configs/database.js";

//create database connection
await connectToDB();

//@ts-ignore
const trackFailedRequest = async (requestData) => {
  const { ip, reason } = requestData.data;

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
  monitorWorker.on("completed", (job) => {
    console.log(`JobId: ${job.id} has completed!`);
  });

  monitorWorker.on("failed", (job, err) => {
    //@ts-ignore
    console.log(`JobId: ${job.id} has failed with ${err.message}`);
  });
} catch (error) {
  console.log("error occurred in monitor worker: ", error);
  process.exit(1);
}
