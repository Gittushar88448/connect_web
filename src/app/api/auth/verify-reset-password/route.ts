import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import crypto from "crypto";
import { sendEmail } from "@/helper/sendVerificationMail";
import forgotPasswordTemplate from "../../../../../emails/forgotPasswordToken";
import logger from "@/lib/logger";

export async function POST(req: Request) {

    try {
        await dbConnect();

        const url = new URL(req.url);
        const { email } = await req.json();

        const validateEmail = z.object({
            email: z.string().trim().email("invalid email")
        });

        const parsedEmail = validateEmail.safeParse({email});
        if (!parsedEmail.success) {
            return Response.json({
                success: false,
                message: "please provide valid email"
            },
                {
                    status: 400
                }
            )
        }
        const normalizedEmail = parsedEmail?.data?.email
        const userData = await UserModel.findOne({email: normalizedEmail});
        if (!userData) {
            return Response.json({
                success: false,
                message: `User with Email id: ${email} is not Registered`
            }, { status: 401 })
        }

        const token = crypto.randomUUID();
        const hashedToken = crypto.createHash("sha256").update(token).digest("base64");

        const updatedDetails = await UserModel.findOneAndUpdate(
            {
                _id: userData._id
            },
            {
                $set: {
                    forgot_pass_token: hashedToken,
                    forgot_pass_token_expiry: Date.now() + 5 * 60 * 1000
                }
            }
        );

        if(!updatedDetails){
            return Response.json({
                success: false,
                message: "failed to set reset password token"
            }, {status: 400});
        }
        
        const resetUrl = `${url.origin}/reset-password?token=${token}`

        const html: string = forgotPasswordTemplate(resetUrl, userData.firstName);

        await sendEmail(
            {
                email,
                subject_text: "Mail For Password Reset",
                body: html
            }
        );

        return Response.json({
            success: true,
            message: "successfully send verification token email"
        },
            { status: 200 }
        );
    } catch (err: any) {

        logger.error("Error while verifying password reset token:", err.message);

        return Response.json(
            {
                success: false,
                message: "Unable to verify Password Reset. Please try again.",
            },
            { status: 500 }
        );
    }

}