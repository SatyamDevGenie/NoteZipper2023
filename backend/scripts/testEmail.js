/**
 * Test script to verify Gmail sending works.
 * Run from project root: node backend/scripts/testEmail.js your@email.com
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

const toEmail = process.argv[2] || process.env.ADMIN_EMAIL;
const user = process.env.ADMIN_EMAIL;
const pass = process.env.ADMIN_EMAIL_APP_PASSWORD;

if (!user || !pass) {
  console.error("Missing .env: ADMIN_EMAIL and ADMIN_EMAIL_APP_PASSWORD required.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user, pass },
});

async function main() {
  try {
    await transporter.verify();
    console.log("SMTP connection OK");
  } catch (err) {
    console.error("SMTP verify failed (check App Password and 2-Step Verification):", err.message);
    process.exit(1);
  }
  try {
    const info = await transporter.sendMail({
      from: `Note Zipper <${user}>`,
      to: toEmail,
      subject: "Note Zipper – Test Email",
      text: "If you got this, email from Note Zipper is working.",
    });
    console.log("Test email sent to", toEmail, "– Message ID:", info.messageId);
  } catch (err) {
    console.error("Send failed:", err.message);
    process.exit(1);
  }
}

main();
