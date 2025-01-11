import { createTransport } from "nodemailer";

const MAIL_SERVER = process.env.MAIL_SERVER;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const SENDER = process.env.MAIL_FROM_EMAIL;

const transporter = createTransport({
  //@ts-ignore
  host: MAIL_SERVER,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

async function sendMail(subject: string, body: string) {
  const receivers_list = ["hritikkumar4720@gmail.com"];
  const receivers = receivers_list.join();

  const info = await transporter.sendMail({
    from: SENDER,
    to: receivers,
    subject: subject,
    text: body,
  });

  return {
    messageId: info.messageId,
  };
}

export default sendMail;
