import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";
import OTPModel from "@/model/OTP";
import UserModel, { UserStatus } from "@/model/User";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const {
            email,
            firstName,
            lastName,
            otp,
            password,
        } = await req.json();

        // Basic validation
        if (!firstName || !email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "Required fields are missing",
                },
                { status: 400 }
            );
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser?.is_verified) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists, Please Sign in",
                },
                { status: 409 }
            );
        }

        const recentOtp = await OTPModel
            .findOne({ email, is_deleted: false })
            .sort({ createdAt: -1 });

        if (!recentOtp) {
            return Response.json(
                {
                    success: false,
                    message: "OTP not found or expired",
                },
                { status: 400 }
            );
        }

        if (otp !== recentOtp.otp) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid OTP",
                },
                { status: 400 }
            );
        }

        const image = `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
            `${firstName} ${lastName ?? ""}`
        )}`;

        if (existingUser) {
            existingUser.firstName = firstName;
            existingUser.lastName = lastName;
            existingUser.password = password;
            existingUser.is_verified = true;
            existingUser.userStatus = UserStatus.ACTIVE;
            existingUser.image = image;

            await existingUser.save();
        } else {
            // New user
            await UserModel.create({
                firstName,
                lastName,
                email,
                password,
                is_verified: true,
                userStatus: UserStatus.ACTIVE,
                image,
            });
        }

        await OTPModel.findOneAndUpdate({
            _id: recentOtp._id,
        },
            {
                $set: {
                    is_deleted: true
                }
            }
        );

        return Response.json(
            {
                success: true,
                message: "User registered successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        logger.error("Error registering user:", error);

        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            { status: 500 }
        );
    }
}