const nodemailer = require("nodemailer");

const MAIL_SERVER = process.env.MAIL_SERVER;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const SENDER = process.env.MAIL_FROM_EMAIL;

const transporter = nodemailer.createTransport({
  host: MAIL_SERVER,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

async function sendMail() {
  const receivers_list = ["hritikkumar0407@gmail.com"];
  const receivers = receivers_list.join();

  const info = await transporter.sendMail({
    from: SENDER,
    to: receivers,
    subject: "Alert Mail",
    text: "You have exceed limit of invalid requests",
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendMail;
