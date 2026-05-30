import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { AUTH } from "./constants";
import type { AuthRole } from "./models/TenantAuth";

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export interface JwtUserPayload extends JWTPayload {
  businessId: string;
  phone: string;
  slug: string;
  role: AuthRole;
}

export async function signJwt(payload: Omit<JwtUserPayload, "exp" | "iat">): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${AUTH.SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyJwt(token: string): Promise<JwtUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as JwtUserPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, AUTH.BCRYPT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generatePasscode(): string {
  const bytes = randomBytes(6);
  const base64 = Buffer.from(bytes)
    .toString("base64url")
    .replace(/[^a-zA-Z0-9]/g, "");
  return base64.slice(0, AUTH.PASSCODE_LENGTH);
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH.COOKIE_NAME)?.value;
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH.SESSION_DURATION_SECONDS,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH.COOKIE_NAME);
}

export async function getAuthenticatedUser(): Promise<JwtUserPayload | null> {
  const token = await getAuthCookie();
  if (!token) return null;
  return verifyJwt(token);
}

export function validatePassword(password: string): {
  valid: boolean;
  message: string;
} {
  if (password.length < AUTH.PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `Password must be at least ${AUTH.PASSWORD_MIN_LENGTH} characters`,
    };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain an uppercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain a number" };
  }
  return { valid: true, message: "" };
}
