import { sendEmail } from "@/helper/sendVerificationMail";
import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import passwordUpdatedTemplate from "../../../../../emails/sucessPasswordUpdate";

export async function POST(req: Request) {
    try {
        await dbConnect()
        const { newPassword, confirmNewPassword, token } = await req.json();
        const hashedToken = crypto.createHash("sha256").update(token).digest("base64");

        if (newPassword !== confirmNewPassword) {
            return Response.json({
                success: false,
                message: "Password not matched with confirm password"
            }, { status: 403 });
        }

        const userData = await UserModel.findOne({ forgot_pass_token: hashedToken });

        if (!userData) {
            return Response.json({
                success: false,
                message: "Invalid Token!!"
            })
        }

        if (userData.forgot_pass_token_expiry < Date.now()) {
            userData.forgot_pass_token = '';
            await userData.save()
            return Response.json(
                {
                    success: false,
                    message: "Password reset token has expired",
                },
                { status: 400 }
            );
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, genSalt);

        const updatedDetails = await UserModel.findOneAndUpdate(
            { _id: userData._id },
            {
                $set: {
                    password: hashedPassword
                }
            }
        );

        if (!updatedDetails) {
            return Response.json({
                success: false,
                message: "Failed to Update Password"
            }, { status: 400 })
        }
        const html: string = passwordUpdatedTemplate(updatedDetails.firstName);
        
        await sendEmail(
            {
                email: userData.email,
                subject_text: "Your ConnectedHub Password Has Been Updated",
                body: html
            }
        )
        return Response.json({
            success: true,
            message: "successfully password Updated"
        }, { status: 200 });

    } catch (error: any) {
        logger.error("failed to reset password", error.message)

        return Response.json({
            success: false,
            message: "Internal Server Error "
        }, { status: 500 })
    }
}