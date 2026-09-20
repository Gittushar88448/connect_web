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
  type: number,
  iat?: number;
  exp?: number;
}

const encodedSecret = new TextEncoder().encode(
  secret
);

export async function createAccessToken(
payload: AccessTokenPayload
): Promise<string> {
  return new SignJWT({
account: payload.account, type: payload.type
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(payload.sub)
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

    const customPayload = payload as Record<string, any>;

    if (
      typeof customPayload.sub !== "string" ||
      typeof customPayload.account !== "string"||
      typeof customPayload.type !== "number"
    ) {
      return null;
    }

    return {
      sub: customPayload.sub,
      account: customPayload.account as Account,
      type: customPayload.type as number,
      iat: customPayload.iat,
      exp: customPayload.exp,
    };
    
  } catch {
    return null;
  }
}