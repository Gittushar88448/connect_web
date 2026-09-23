import transporter from "@/lib/nodemailerConfig";
import logger from "@/lib/logger";

export interface IMailType {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  to,
  subject,
  html,
}: IMailType) {
  try {
    const fromName = process.env.EMAIL_FROM_NAME;
    const fromAddress = process.env.EMAIL_FROM_ADDRESS;

    if (!fromName || !fromAddress) {
      throw new Error(
        "EMAIL_FROM_NAME and EMAIL_FROM_ADDRESS must be configured"
      );
    }

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    logger.error("Error sending email:", error);

    throw error;
  }
}