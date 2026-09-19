import dbConnect from "@/lib/dbConnect";
import RefreshTokenModel from "@/model/RefreshToken";

import {
  getRefreshTokenCookie,
  clearRefreshTokenCookie,
  deleteUserProfileFromCookie,
  clearAccessTokenCookie,
} from "@/lib/auth/session";

import {
  hashRefreshToken,
} from "@/lib/auth/refreshToken";

export async function POST() {
  try {
    await dbConnect();

    const refreshToken =
      await getRefreshTokenCookie();

    if (refreshToken) {
      const tokenHash =
        hashRefreshToken(
          refreshToken
        );

      await RefreshTokenModel.updateOne(
        {
          tokenHash,
          revokedAt: null,
        },
        {
          $set: {
            revokedAt: new Date(),
          },
        }
      );
    }

    await clearRefreshTokenCookie();
    await clearAccessTokenCookie();
    await deleteUserProfileFromCookie();
    
    return Response.json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error(
      "Logout error:",
      error
    );

    await clearRefreshTokenCookie();

    return Response.json({
      success: true,
      message: "Logged out",
    });
  }
}