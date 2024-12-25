import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  if (user) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/blog",
};
