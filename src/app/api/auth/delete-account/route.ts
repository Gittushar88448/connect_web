import { verifyAccessToken } from "@/lib/auth/accessToken";
import { hashRefreshToken } from "@/lib/auth/refreshToken";
import { clearRefreshTokenCookie, getRefreshTokenCookie } from "@/lib/auth/session";
import dbConnect from "@/lib/dbConnect";
import RefreshTokenModel from "@/model/RefreshToken";
import { IRevokedRegisteredUser } from "@/model/RevokedRegisteredUser";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import RevokedUser from "../../../../model/RevokedRegisteredUser";
import OTPModel from "@/model/OTP";
import { success } from "zod";

export async function POST(
): Promise<any> {
    try {

        await dbConnect();
        const storeCookie = await cookies();
        let user;
        const access_token = storeCookie.get("accessToken")?.value;

        if (!access_token) {
            return Response.json({
                success: false,
                message: "Unauthorized"
            },
                {
                    status: 401
                }
            )
        }

        const payload = await verifyAccessToken(access_token);

        if (!payload) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid or expired token",
                },
                { status: 401 }
            );
        }

        const user_id = payload?.sub;

        if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
            return Response.json({
                success: false,
                message: "invalid payload"
            });
        }

        const user_object_id =
            new mongoose.Types.ObjectId(user_id);

        user = await UserModel.findOne({
            _id: user_object_id,
            is_deleted: false
        });

        if (!user) {
            return Response.json({
                success: false,
                message: "Invalid User"
            }, {
                status: 409
            })
        };

        // migrate the user data from user model to revokedUserModel

        const existingUserData: IRevokedRegisteredUser = {
            firstName: user.firstName || "",
            userId: user._id,
            lastName: user?.lastName || "",
            email: user.email || "",
            account: user?.account,
            dob: user?.dob,
            gender: user?.gender,
            coinBalance: user?.coinBalance || 0,
            phone_no: user?.phone_no,
            image: user?.image,
            is_deleted: true,
            createdAt: user.createdAt,
            updatedAt: new Date()
        };

        const revokedData = await RevokedUser.create(existingUserData);

        if (!revokedData) {
            return Response.json({
                success: false,
                message: "Failed to store Revoked user data"
            }, { status: 400 })
        }

        await OTPModel.findOneAndUpdate(
            {
                email: user?.email,
                is_deleted: false
            },
            {
                $set: {
                    is_deleted: true
                }
            }
        );
        const refreshToken =
            await getRefreshTokenCookie();

        if (!refreshToken) {
            return Response.json(
                {
                    success: false,
                    message: "Token not found !!"
                },
                {
                    status: 400
                }
            )
        }

        const tokenHash = hashRefreshToken(refreshToken);

        const refreshTokenVerification = await RefreshTokenModel.findOne({
            tokenHash,
            revokedAt: null
        });

        if (!refreshTokenVerification) {
            return Response.json({
                success: false,
                meesage: "Invalid token"
            }, {
                status: 400
            })
        }

        await RefreshTokenModel.updateOne(
            {
                tokenHash,
                revokedAt: null
            }, {
            $set: {
                revokedAt: new Date()
            }
        }
        )

        await clearRefreshTokenCookie();

        const delUser = await UserModel.findOneAndDelete({ _id: user._id, is_deleted: false });
        user = null;

        if(!delUser){
            return Response.json({
                success: false,
                message: "failed To Delted Account"
            }, {status: 400})
        }
        
        return Response.json(
            {
                success: true,
                message: "User Data Deleted Successfully"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }

        )
    }
}