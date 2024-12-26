import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the current route path
  const user = await getCurrentUser();

  // Allow access to the login page
  if (pathname === "/login") {
    // If the user is authenticated, redirect them to the home page
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to the route if the user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/(.)", "/login"], // Matches all routes
};
