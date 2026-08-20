import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";

import OTPModel from "@/model/OTP";
import UserModel, { UserStatus } from "@/model/User";
import RefreshTokenModel from "@/model/RefreshToken";

import { createAccessToken } from "@/lib/auth/accessToken";
import {
    generateRefreshToken,
    hashRefreshToken,
    generateTokenFamily,
} from "@/lib/auth/refreshToken";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/auth/session";


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


        if (!firstName || !email || !password || !otp) {
            return Response.json(
                {
                    success: false,
                    message: "Required fields are missing",
                },
                { status: 400 }
            );
        }


        const normalizedEmail = email
            .trim()
            .toLowerCase();


        const existingUser = await UserModel.findOne({
            email: normalizedEmail,
            is_deleted: false
        });


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
            .findOne({
                email: normalizedEmail,
                is_deleted: false,
            })
            .sort({
                createdAt: -1,
            });


        if (!recentOtp) {
            return Response.json(
                {
                    success: false,
                    message: "OTP not found or expired",
                },
                { status: 400 }
            );
        }

        if (
            recentOtp.expiresAt &&
            recentOtp.expiresAt < new Date()
        ) {
            return Response.json(
                {
                    success: false,
                    message: "OTP has expired",
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

        const image =
            `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                `${firstName} ${lastName ?? ""}`
            )}`;

        let user;


        if (existingUser) {

            existingUser.firstName = firstName;
            existingUser.lastName = lastName;
            existingUser.password = password;
            existingUser.is_verified = true;
            existingUser.userStatus = UserStatus.ACTIVE;
            existingUser.image = image;

            user = await existingUser.save();

        } else {

            user = await UserModel.create({
                firstName,
                lastName,
                email: normalizedEmail,
                password,

                is_verified: true,
                userStatus: UserStatus.ACTIVE,
                image,
            });
        }

        await OTPModel.findByIdAndUpdate(
            recentOtp._id,
            {
                $set: {
                    is_deleted: true,
                },
            }
        );

        const accessToken =
            await createAccessToken(
                user._id.toString(),
                user.account
            );

        const refreshToken =
            generateRefreshToken();

        const refreshTokenHash =
            hashRefreshToken(refreshToken);

        const tokenFamily =
            generateTokenFamily();

        const refreshTokenExpiresAt =
            new Date(
                Date.now() +
                30 * 24 * 60 * 60 * 1000
            );

        await RefreshTokenModel.create({
            userId: user._id,
            tokenHash: refreshTokenHash,
            tokenFamily,
            expiresAt: refreshTokenExpiresAt,
        });

        await setAccessTokenCookie(accessToken);
        await setRefreshTokenCookie(refreshToken);

        return Response.json(
            {
                success: true,
                message:
                    "Account created successfully. You are now logged in.",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    account: user.account,
                    userStatus: user.userStatus,
                    coinBalance: user.coinBalance,
                    image: user.image,
                },
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        logger.error(
            "Error registering user:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Error registering user",
            },
            {
                status: 500,
            }
        );
    }
}