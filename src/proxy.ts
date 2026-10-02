import { NextResponse, type NextRequest } from "next/server";

/**
 * Protection de /espace-pro par un code d'accès (cookie httpOnly).
 * Suffisant pour une démonstration — à remplacer par une vraie
 * authentification (NextAuth/Auth.js, Clerk, Supabase Auth…) en production.
 */
const ADMIN_COOKIE = "samyo_admin";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/espace-pro/login")) return NextResponse.next();
  if (req.cookies.get(ADMIN_COOKIE)?.value === "1") return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/espace-pro/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/espace-pro/:path*"] };
