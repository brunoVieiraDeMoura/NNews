import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Bruno code test <bruno.moura.code@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<p>${options.message}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
