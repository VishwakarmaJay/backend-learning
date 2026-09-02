import nodemailer from "nodemailer";
import logger from "../utils/logger.js";

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", port: 587,
  auth: { user: testAccount.user, pass: testAccount.pass },
});



export const sendWelcomeEmail = async (to,name) => {
  try {
    const info = await transporter.sendMail({
      from: '"Movie App" <no-reply@movieapp.dev>',
      to: to,
      subject: "Welcome!",
      html: `<h1>Welcome to Movie App, ${name}!</h1>`,
    });

    const url = nodemailer.getTestMessageUrl(info);
    logger.info({ url }, "welcome email sent");
  } catch (error) {
    logger.error(error, "Error sending welcome email");
    throw new AppError("Error sending welcome email", 500);
  }
};


