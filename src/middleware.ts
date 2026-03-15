import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Redirect www → apex
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
