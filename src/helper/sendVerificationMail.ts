import transporter from "@/lib/nodemailerConfig";
import logger from "@/lib/logger";

export interface IMailType {
    email: string,
    subject_text: string,
    body: string
}

export async function sendEmail(
    { email, subject_text, body
    }: IMailType) {
    try {

        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,

            to: email,

            subject: subject_text,

            html: body,
        };
        const result = await transporter.sendMail(mailOptions);
        return {
            success: true,
            messageId: result.messageId,
        };

    } catch (error) {
        logger.error("Error sending verification email:", error);

        throw error;
    }
}