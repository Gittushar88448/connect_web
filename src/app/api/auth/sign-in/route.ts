import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import RefreshTokenModel from "@/model/RefreshToken";

import {
  loginSchema,
} from "@/schemas/auth.schema";

import {
  createAccessToken,
} from "@/lib/auth/accessToken";

import {
  generateRefreshToken,
  hashRefreshToken,
  generateTokenFamily,
} from "@/lib/auth/refreshToken";

import {
    setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/auth/session";

import {
  REFRESH_TOKEN_EXPIRES_IN_DAYS,
} from "@/lib/auth/constants";
import logger from "@/lib/logger";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const result =
      loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid input",
          errors:
            result.error.format(),
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } =
      result.data;

    const user =
      await UserModel.findOne({
        email,
      }).select("+password");

    if (!user) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    if (user.is_deleted) {
      return Response.json(
        {
          success: false,
          message:
            "This account is unavailable",
        },
        {
          status: 403,
        }
      );
    }

    if (
      user.userStatus !== "active"
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Your account is not active",
        },
        {
          status: 403,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken =
      await createAccessToken(
        user._id.toString(),
        user.account
    );

    const refreshToken =
      generateRefreshToken();

    const tokenHash =
      hashRefreshToken(
        refreshToken
      );

    const tokenFamily =
      generateTokenFamily();

    const expiresAt = new Date(
      Date.now() +
        REFRESH_TOKEN_EXPIRES_IN_DAYS *
          24 *
          60 *
          60 *
          1000
    );

    await RefreshTokenModel.create({
      userId: user._id,
      tokenHash,
      tokenFamily,
      expiresAt,
    });

    await setAccessTokenCookie(
      accessToken
    );
    await setRefreshTokenCookie(
      refreshToken
    );

    return Response.json(
      {
        success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          account: user.account,
          userStatus: user.userStatus,
          coinBalance:
            user.coinBalance,
          image: user.image,
        },
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    logger.error(
      "Login error:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}