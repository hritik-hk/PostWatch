import { Queue } from "bullmq";
import redisConn from "../configs/redis.js";

const monitorTaskQueue = new Queue("monitor-processing-queue", {
  connection: redisConn,
});

export default monitorTaskQueue;
