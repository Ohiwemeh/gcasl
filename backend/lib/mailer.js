import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationStatusEmail = async (email, name, status) => {
  const subject = `Verification ${status === "approved" ? "Approved" : "Declined"}`;
  const html = `
    <p>Hi ${name},</p>
    <p>Your verification request has been <strong style="color:${
      status === "approved" ? "green" : "red"
    };">${status.toUpperCase()}</strong>.</p>
    <p>Thank you for using our platform.</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Admin Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${email}`);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};
