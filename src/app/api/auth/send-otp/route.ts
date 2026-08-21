import { sendEmail } from "@/helper/sendVerificationMail";
import dbConnect from "@/lib/dbConnect";
import OTPModel from "@/model/OTP";
import UserModel from "@/model/User";
import emailVerificationTemplate from "../../../../../emails/userVerification";
import { randomInt } from "crypto";
import logger from "@/lib/logger";


export async function POST(req: Request) {
    try {
        await dbConnect();

        const { email } = await req.json();

        if (!email) {
            return Response.json(
                {
                    success: false,
                    message: "Please enter the email address",
                },
                { status: 400 }
            );
        }

        const normalizedEmail = email;
        const existingUser = await UserModel.findOne({
            email,
            is_verified: true,
            is_deleted: false
        });

        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists, please login",
                },
                { status: 409 }
            );
        }


        // Generate a secure 6-digit OTP
        const otp = randomInt(100000, 1000000).toString();

        const firstName = normalizedEmail
            .split("@")[0];

        await OTPModel.findOneAndUpdate({
            email,
        },
            {
                $set: {
                    is_deleted: true
                }
            }
        );

        const expiryDate = new Date(Date.now() + 5 * 60 * 1000);

        // Create OTP
        const otpResult = new OTPModel({
            email,
            otp,
            expiresAt: expiryDate
        });

        await otpResult.save();

        const html: string = emailVerificationTemplate(
            otp,
            firstName
        );

            await sendEmail(
                {
                    email,
                    subject_text: `Verify Your Connected Hub Account`,
                    body: html
                }
            );

        return Response.json(
            {
                success: true,
                message: "OTP sent successfully to your email",
            },
            { status: 200 }
        );
    } catch (error: any) {

        logger.error("Error sending OTP:", error.message);

        return Response.json(
            {
                success: false,
                message: "Unable to send OTP. Please try again.",
            },
            { status: 500 }
        );
    }
}