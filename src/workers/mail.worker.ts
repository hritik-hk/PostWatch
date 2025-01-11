import "dotenv/config";
import { Worker } from "bullmq";
import redisConn from "../configs/redis.js";
import sendMail from "../configs/mail.js";

//@ts-ignore
const processSendingMail = async (mail) => {
  const { mailSubject, mailBody } = mail.data;
  await sendMail(mailSubject, mailBody);
};

try {
  const sendMailWorker = new Worker(
    "mail-processing-queue",
    processSendingMail,
    {
      connection: redisConn,
    }
  );

  console.log("send-mail worker starting...");
  sendMailWorker.on("completed", (job) => {
    console.log(`JobId: ${job.id} has completed!`);
  });

  sendMailWorker.on("failed", (job, err) => {
    //@ts-ignore
    console.log(`JobId: ${job.id} has failed with ${err.message}`);
  });
} catch (error) {
  console.log("error occurred in send-mail worker: ", error);
  process.exit(1);
}
