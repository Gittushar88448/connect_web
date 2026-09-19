import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";
import UserModel, { UserStatus } from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
    try {
        await dbConnect();

        const {
            email,
            firstName,
            lastName,
            password,
        } = await req.json();


        if (!firstName || !email || !password) {
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
            is_verified: false
        });


        if (existingUser) {
            return Response.json(
                {
                    success: true,
                    message: "User already exists, but not verified",
                },
                { status: 200 }
            );
        }

        const user = await UserModel.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password,
            is_verified: false,
            userStatus: UserStatus.PENDING
        });

        return Response.json(
            {
                success: true,
                message:
                    "Account Initiated, You may Verify now.",
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        logger.error(
            "Error while initiating user:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Error while initiate register user",
            },
            {
                status: 500,
            }
        );
    }
}