import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET!);
const COOKIE = "nx_session";
const EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days

interface SessionPayload {
  role: "admin";
  expiresAt: string;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function decrypt(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload & { iat: number; exp: number };
  } catch {
    return null;
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + EXPIRES_IN).toISOString();
  const token = await encrypt({ role: "admin", expiresAt });
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + EXPIRES_IN),
    path: "/",
  });
}

export async function deleteSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return decrypt(token);
}
