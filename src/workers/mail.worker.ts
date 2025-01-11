import "dotenv/config";
import { Worker } from "bullmq";
import redisConn from "../configs/redis.js";
import sendMail from "../configs/mail.js";

//@ts-ignore
const processSendingMail = async (mailData) => {
  const mailSubject = mailData.mailSubject;
  const mailBody = mailData.mailBody;
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
} catch (error) {
  console.log("error occurred in send-mail worker: ", error);
  process.exit(1);
}
