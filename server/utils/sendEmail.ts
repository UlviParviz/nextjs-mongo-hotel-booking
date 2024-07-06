import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export default async (options: EmailOptions) => {
  const transport = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMPTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const message = {
    from: `${process.env.SMPTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};
