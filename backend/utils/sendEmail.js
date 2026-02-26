import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.ADMIN_EMAIL;
  const pass = process.env.ADMIN_EMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send first-login welcome email from satyamsawant54@gmail.com to the user
 * @param {string} to - User's email address
 * @param {string} userName - User's name
 * @returns {Promise<void>}
 */
export const sendFirstLoginEmail = async (to, userName) => {
  const user = process.env.ADMIN_EMAIL;
  const pass = process.env.ADMIN_EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn(
      "First-login email skipped: ADMIN_EMAIL or ADMIN_EMAIL_APP_PASSWORD not set in .env"
    );
    return;
  }

  const transporter = getTransporter();
  const text = `Welcome to Note Zipper!\n\nHi ${userName || "there"},\n\nThis is a quick note to confirm that you've logged in to Note Zipper for the first time.\n\nWe're glad to have you. You can start creating and organizing your notes right away.\n\nHappy note-taking!\n\n— The Note Zipper Team`;

  const mailOptions = {
    from: `Note Zipper <${user}>`,
    to,
    subject: "Welcome to Note Zipper – Your First Login",
    text,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Note Zipper!</h2>
        <p>Hi ${userName || "there"},</p>
        <p>This is a quick note to confirm that you've logged in to <strong>Note Zipper</strong> for the first time.</p>
        <p>We're glad to have you. You can start creating and organizing your notes right away.</p>
        <p>If you have any questions, feel free to reach out.</p>
        <p>Happy note-taking!</p>
        <p style="color: #6b7280; margin-top: 2rem;">— The Note Zipper Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`First-login welcome email sent to ${to}`);
    return true;
  } catch (err) {
    console.error("Failed to send first-login email:", err.message);
    console.error("Full error:", err);
    return false;
  }
};
