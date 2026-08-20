import { SignJWT, jwtVerify } from "jose";
import { Account } from "@/model/User";

const secret = process.env.JWT_ACCESS_SECRET;

if (!secret) {
  throw new Error(
    "JWT_ACCESS_SECRET is not configured"
  );
}

export interface AccessTokenPayload {
  sub: string;
  account: Account;
  iat?: number;
  exp?: number;
}

const encodedSecret = new TextEncoder().encode(
  secret
);

export async function createAccessToken(
  userId: string,
  account: string
) {
  return new SignJWT({
    account,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(encodedSecret);
}


export async function verifyAccessToken(
  token: string
): Promise<AccessTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      encodedSecret
    );

    if (
      typeof payload.sub !== "string" ||
      typeof payload.account !== "string"
    ) {
      return null;
    }

    return {
      sub: payload.sub,
      account: payload.account as Account,
      iat: payload.iat,
      exp: payload.exp,
    };
    
  } catch {
    return null;
  }
}