import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");
  const currentUrl = request.nextUrl.pathname;
  const nextToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("token from middleware", nextToken);

  if (!token) return NextResponse.rewrite(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};

