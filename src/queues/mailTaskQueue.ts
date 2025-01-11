import { Queue } from "bullmq";
import redisConn from "../configs/redis.js";

const mailTaskQueue = new Queue("mail-processing-queue", {
  connection: redisConn,
});

export default mailTaskQueue;
