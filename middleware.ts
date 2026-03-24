import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const isRummageboard = host.startsWith("rummageboard.");

  if (isRummageboard) {
    const url = req.nextUrl.clone();

    if (url.pathname.startsWith("/api")) {
      url.pathname = "/api/rummageboard";
      return NextResponse.rewrite(url);
    }

    url.pathname = "/rummageboard";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
