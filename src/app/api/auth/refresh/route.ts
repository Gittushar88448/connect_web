import dbConnect from "@/lib/dbConnect";
import RefreshTokenModel from "@/model/RefreshToken";
import UserModel from "@/model/User";

import {
    createAccessToken,
} from "@/lib/auth/accessToken";

import {
    generateRefreshToken,
    hashRefreshToken,
} from "@/lib/auth/refreshToken";

import {
    getRefreshTokenCookie,
    setRefreshTokenCookie,
    clearRefreshTokenCookie,
} from "@/lib/auth/session";

import {
    REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "@/lib/auth/constants";
import logger from "@/lib/logger";

export async function POST() {
    try {
        await dbConnect();

        const oldToken =
            await getRefreshTokenCookie();

        if (!oldToken) {
            return Response.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const oldHash =
            hashRefreshToken(oldToken);

        const storedToken =
            await RefreshTokenModel.findOne({
                tokenHash: oldHash,
            });

        if (!storedToken) {
            await clearRefreshTokenCookie();

            return Response.json(
                {
                    success: false,
                    message:
                        "Invalid refresh token",
                },
                {
                    status: 401,
                }
            );
        }

        
        if (storedToken.revokedAt) {
            await RefreshTokenModel.updateMany(
                {
                    tokenFamily:
                        storedToken.tokenFamily,
                },
                {
                    $set: {
                        revokedAt: new Date(),
                    },
                }
            );

            await clearRefreshTokenCookie();

            return Response.json(
                {
                    success: false,
                    message:
                        "Session expired. Please login again.",
                },
                {
                    status: 401,
                }
            );
        }


        if (
            storedToken.expiresAt <
            new Date()
        ) {
            await clearRefreshTokenCookie();

            return Response.json(
                {
                    success: false,
                    message:
                        "Refresh token expired",
                },
                {
                    status: 401,
                }
            );
        }


        const user =
            await UserModel.findById(
                storedToken.userId
            );

        if (
            !user ||
            user.is_deleted ||
            user.userStatus !== "active"
        ) {
            await clearRefreshTokenCookie();

            return Response.json(
                {
                    success: false,
                    message:
                        "User session is invalid",
                },
                {
                    status: 401,
                }
            );
        }


        const newRefreshToken =
            generateRefreshToken();

        const newTokenHash =
            hashRefreshToken(
                newRefreshToken
            );

        const expiresAt = new Date(
            Date.now() +
            REFRESH_TOKEN_EXPIRES_IN_DAYS *
            24 *
            60 *
            60 *
            1000
        );

        storedToken.revokedAt =
            new Date();

        await storedToken.save();

        await RefreshTokenModel.create({
            userId: user._id,

            tokenHash:
                newTokenHash,

            tokenFamily:
                storedToken.tokenFamily,

            expiresAt,
        });


        const accessToken =
            await createAccessToken(
                user._id.toString(),
                user.account
            );

        await setRefreshTokenCookie(
            newRefreshToken
        );

        return Response.json(
            {
                success: true,
                accessToken,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        logger.error(
            "Refresh token error:",
            error
        );

        await clearRefreshTokenCookie();

        return Response.json(
            {
                success: false,
                message:
                    "Unable to refresh session",
            },
            {
                status: 401,
            }
        );
    }
}