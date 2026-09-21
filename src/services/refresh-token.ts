import "server-only";

import dbConnect from "@/lib/dbConnect";

import {
    generateRefreshToken,
    generateTokenFamily,
    hashRefreshToken,
} from "@/lib/auth/refreshToken";

import RefreshTokenModel from "@/model/RefreshToken";

import {
    getUserById,
    type UserRecord,
} from "@/services/users";

import { UserStatus } from "@/types/user-enums";
import { REFRESH_TOKEN_EXPIRES_IN_DAYS } from "@/lib/auth/constants";
import mongoose from "mongoose";

function getExpiresAt(): Date {
    return new Date(
        Date.now() +
        REFRESH_TOKEN_EXPIRES_IN_DAYS *
        24 *
        60 *
        60 *
        1000
    );
}

export async function issueRefreshToken(
    userId: string,
    tokenFamily = generateTokenFamily()
): Promise<string> {
    await dbConnect();

    const rawToken =
        generateRefreshToken();

    await RefreshTokenModel.create({
        userId,
        tokenHash:
            hashRefreshToken(rawToken),
        tokenFamily,
        expiresAt: getExpiresAt(),
    });

    return rawToken;
}

export interface RotatedRefreshSession {
    user: UserRecord;
    refreshToken: string;
}

export async function rotateRefreshToken(
    rawToken: string
): Promise<RotatedRefreshSession | null> {
    await dbConnect();

    const tokenHash =
        hashRefreshToken(rawToken);

    const stored =
        await RefreshTokenModel.findOne({
            tokenHash,
        });

    if (!stored) {
        return null;
    }

    if (
        stored.revokedAt ||
        stored.expiresAt.getTime() <= Date.now()
    ) {
        return null;
    }

    /*
     * Refresh token does NOT contain account/type/user
     * information. We get the user from MongoDB.
     */
    const user = await getUserById(
        String(stored.userId)
    );

    if (
        !user ||
        user.userStatus ===
        UserStatus.SUSPENDED
    ) {
        await RefreshTokenModel.updateMany(
            {
                tokenFamily:
                    stored.tokenFamily,
                revokedAt: null,
            },
            {
                $set: {
                    revokedAt: new Date(),
                },
            }
        );

        return null;
    }

    /*
     * Atomically consume the old refresh token.
     */
    const consumed =
        await RefreshTokenModel.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(stored._id),
                revokedAt: null,
                expiresAt: {
                    $gt: new Date(),
                },
            },
            {
                $set: {
                    revokedAt: new Date(),
                },
            },
            {
                new: true,
            }
        );

    if (!consumed) {
        return null;
    }

    /*
     * Create a completely new opaque refresh token
     * in the same token family.
     */
    const newRefreshToken =
        await issueRefreshToken(
            user.id,
            stored.tokenFamily
        );

    return {
        user,
        refreshToken: newRefreshToken,
    };
}

export async function revokeRefreshToken(
    rawToken: string
) {
    await dbConnect();

    await RefreshTokenModel.updateOne(
        {
            tokenHash:
                hashRefreshToken(rawToken),
            revokedAt: null,
        },
        {
            $set: {
                revokedAt: new Date(),
            },
        }
    );
}