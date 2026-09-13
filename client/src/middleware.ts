import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "bikewo_cms_session";

function sessionSecret() {
  return (
    process.env.CMS_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "bikewo-cms-dev-secret-change-me"
  );
}

function base64UrlEncode(bytes: ArrayBuffer | Uint8Array) {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (let i = 0; i < u8.length; i++) binary += String.fromCharCode(u8[i]!);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeToString(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return atob(padded + pad);
}

/** Edge-safe check matching `unsign` in lib/cms/auth.ts (HMAC-SHA256 + exp). */
async function sessionTokenValid(token: string): Promise<boolean> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  const expected = base64UrlEncode(mac);
  if (expected.length !== sig.length || expected !== sig) return false;

  try {
    const payload = JSON.parse(base64UrlDecodeToString(body)) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp >= Date.now();
  } catch {
    return false;
  }
}

function clearSession(response: NextResponse) {
  response.cookies.set({
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE)?.value;
  const valid = token ? await sessionTokenValid(token) : false;

  if (pathname === "/admin/login") {
    if (valid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token && !valid) {
      const res = NextResponse.next();
      clearSession(res);
      return res;
    }
    return NextResponse.next();
  }

  if (!valid) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    const res = NextResponse.redirect(login);
    if (token) clearSession(res);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
