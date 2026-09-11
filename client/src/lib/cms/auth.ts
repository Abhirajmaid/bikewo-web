import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { CmsMember } from "./types";
import { getDb, updateMember } from "./db";

const COOKIE = "bikewo_cms_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

function sessionSecret() {
  return (
    process.env.CMS_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "bikewo-cms-dev-secret-change-me"
  );
}

export function hashPassword(password: string, salt?: string) {
  const useSalt = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, useSalt, 64).toString("hex");
  return `${useSalt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 64);
  const prev = Buffer.from(hash, "hex");
  if (next.length !== prev.length) return false;
  return timingSafeEqual(next, prev);
}

type SessionPayload = {
  memberId: string;
  email: string;
  exp: number;
};

function sign(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function unsign(token: string): SessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", sessionSecret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createSessionToken(member: CmsMember) {
  return sign({
    memberId: member.id,
    email: member.email,
    exp: Date.now() + MAX_AGE_SEC * 1000,
  });
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export async function getSessionMember(): Promise<CmsMember | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const payload = unsign(token);
  if (!payload) return null;
  const db = getDb();
  const member = db.members.find((m) => m.id === payload.memberId);
  if (!member || member.status !== "active") return null;
  return member;
}

export async function requireSessionMember() {
  const member = await getSessionMember();
  if (!member) throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  return member;
}

export function publicMember(member: CmsMember) {
  const { passwordHash: _, ...rest } = member;
  return rest;
}

export async function authenticate(email: string, password: string) {
  const db = getDb();
  const member = db.members.find(
    (m) => m.email.toLowerCase() === email.toLowerCase() && m.status === "active",
  );
  if (!member || !verifyPassword(password, member.passwordHash)) return null;
  updateMember(member.id, { lastActiveAt: new Date().toISOString() });
  return member;
}

export { COOKIE as CMS_SESSION_COOKIE };
