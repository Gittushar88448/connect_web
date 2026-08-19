import transporter from "@/lib/nodemailerConfig";
import emailVerificationTemplate from "../../emails/userVerification";
import logger from "@/lib/logger";

export async function sendVerificationEmail(
  email: string,
  firstName: string,
  otp: string
) {
  try {
    const html = emailVerificationTemplate(
        otp,
      firstName
    );

    const mailOptions = {
      from:`"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,

      to: email,

      subject: "Verify Your Connected Hub Account",

      html,
    };
    const result = await transporter.sendMail(mailOptions);
    logger.info("mail result", result)

    return {
      success: true,
      messageId: result.messageId,
    };

  } catch (error) {
    logger.error("Error sending verification email:", error);

    throw error;
  }
}