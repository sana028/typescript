import nodemailer from "nodemailer";
import { environments } from "../environments/dev.environemnt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanasyed1998786@gmail.com",
    pass: "bfwk heic yndq bzru",
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
    const mailOptions = {
        from: environments.Email,
        to: email,
        subject: "Welcome to the Developer World 😎", // emoji in subject
        html: `
          <p>Hi ${name},</p>  
          <pre>
            Welcome to the Developer World, I know you are excited to track your daily tasks using this application. 
            I am excited to see you grow and become a better developer.
          </pre>
          <p>Thank you for choosing us.</p>
          <br />
          <p>Thanks,<br />
          Developer World 😎</p>
        `,
      };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
